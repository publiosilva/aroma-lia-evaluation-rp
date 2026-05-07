#!/usr/bin/env python3
"""
Statistical significance analyses for RQ1, RQ2 and RQ3.
"""

import os
from itertools import combinations

import numpy as np
import pandas as pd
from scipy.stats import binomtest, norm
from statsmodels.genmod.bayes_mixed_glm import BinomialBayesMixedGLM


CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
RESULTS_DIR = os.path.join(CURRENT_DIR, "..", "results")
GROUND_TRUTH_DIR = os.path.join(CURRENT_DIR, "..", "..", "dataset-sheets", "ground-truth")
AROMALIA_SUMMARY_DIR = os.path.join(CURRENT_DIR, "..", "..", "tool-execution", "aromalia", "summary")

BASELINE_SOURCES = {
    "xNose": {
        "language": "csharp",
        "path": os.path.join(CURRENT_DIR, "..", "..", "tool-execution", "xnose", "summary", "xnose-detections.csv"),
    },
    "TSDetect": {
        "language": "java",
        "path": os.path.join(CURRENT_DIR, "..", "..", "tool-execution", "tsdetect", "summary", "tsdetect-detections.csv"),
    },
    "pytest-smell": {
        "language": "python",
        "path": os.path.join(CURRENT_DIR, "..", "..", "tool-execution", "pytest-smell", "summary", "pytest-smell-detections.csv"),
    },
}

LANGUAGES = ["java", "python", "csharp", "javascript", "typescript"]
ALPHA = 0.05

LONG_TABLE_OUT = os.path.join(RESULTS_DIR, "rq1-rq3-long-format-correctness.csv")
RQ1_OUT = os.path.join(RESULTS_DIR, "rq1-statistical-tests.csv")
RQ23_OMNIBUS_OUT = os.path.join(RESULTS_DIR, "rq2-rq3-omnibus-tests.csv")
RQ23_PAIRWISE_OUT = os.path.join(RESULTS_DIR, "rq2-rq3-pairwise-tests.csv")
INTERPRETATION_OUT = os.path.join(RESULTS_DIR, "rq1-rq2-rq3-statistical-interpretation.md")


def normalize_filename(value):
    return str(value).strip().lower()


def to_long_format(language, df_true, df_pred, tool_name):
    df_true = df_true.copy()
    df_pred = df_pred.copy()
    df_true["filename_norm"] = df_true["filename"].map(normalize_filename)
    df_pred["filename_norm"] = df_pred["filename"].map(normalize_filename)

    merged = df_true.merge(
        df_pred,
        on="filename_norm",
        suffixes=("_true", "_pred"),
        how="inner",
    )
    if merged.empty:
        raise ValueError(f"No matching files between truth and predictions for {tool_name} ({language})")

    smell_cols_true = [c for c in merged.columns if c.endswith("_true") and c != "filename_true"]
    smell_base = [c.replace("_true", "") for c in smell_cols_true]

    records = []
    for _, row in merged.iterrows():
        filename = row["filename_true"]
        for smell in smell_base:
            if language == "csharp" and smell == "ExceptionHandling":
                continue
            y_true = int(row[f"{smell}_true"])
            y_pred = int(row[f"{smell}_pred"])
            records.append(
                {
                    "language": language,
                    "filename": filename,
                    "smell": smell,
                    "y_true": y_true,
                    "y_pred": y_pred,
                    "tool": tool_name,
                    "correct": int(y_true == y_pred),
                }
            )
    return pd.DataFrame(records)


def holm_adjust(p_values):
    p_values = np.asarray(p_values, dtype=float)
    n = len(p_values)
    order = np.argsort(p_values)
    adjusted = np.zeros(n, dtype=float)
    running_max = 0.0
    for rank, idx in enumerate(order):
        factor = n - rank
        value = min(1.0, p_values[idx] * factor)
        running_max = max(running_max, value)
        adjusted[idx] = running_max
    return adjusted.tolist()


def mcnemar_exact_test(b, c):
    n = b + c
    if n == 0:
        p_value = 1.0
    else:
        p_value = binomtest(min(b, c), n=n, p=0.5, alternative="two-sided").pvalue
    discordant_advantage = (b - c) / n if n else 0.0
    return {
        "b": int(b),
        "c": int(c),
        "n_discordant": int(n),
        "p_value": float(p_value),
        "discordant_advantage": float(discordant_advantage),
    }


def _get_fixed_effects(result):
    names = result.model.exog_names
    k = len(names)
    mean = np.asarray(result.fe_mean)
    cov_raw = np.asarray(result.cov_params())
    if cov_raw.ndim == 1:
        cov = np.diag(cov_raw[:k])
    else:
        cov = cov_raw[:k, :k]
    return names, mean, cov


def _coefficient_summary(result):
    names, mean, cov = _get_fixed_effects(result)
    rows = []
    for i, name in enumerate(names):
        se = float(np.sqrt(max(cov[i, i], 0.0)))
        z = float(mean[i] / se) if se > 0 else 0.0
        p = float(2 * (1 - norm.cdf(abs(z))))
        rows.append({"term": name, "estimate": float(mean[i]), "std_error": se, "z_value": z, "p_value": p})
    return pd.DataFrame(rows)


def _wald_block_test(summary_df, pattern):
    block = summary_df[summary_df["term"].str.contains(pattern, regex=False)]
    if block.empty:
        return np.nan
    stat = float(np.sum((block["z_value"].astype(float)) ** 2))
    df = int(len(block))
    # Chi-square SF via normal approximation fallback is unnecessary; use scipy from stats namespace
    from scipy.stats import chi2
    return float(chi2.sf(stat, df))


def _pairwise_from_treatment(result, factor_name, levels):
    names, mean, cov = _get_fixed_effects(result)
    idx_map = {n: i for i, n in enumerate(names)}
    baseline = levels[0]
    contrasts = []

    def beta_for(level):
        if level == baseline:
            return None
        term = f"C({factor_name})[T.{level}]"
        return idx_map.get(term)

    for a, b in combinations(levels, 2):
        vec = np.zeros(len(names))
        ia = beta_for(a)
        ib = beta_for(b)
        if ia is not None:
            vec[ia] += 1.0
        if ib is not None:
            vec[ib] -= 1.0

        est = float(vec @ mean)
        se = float(np.sqrt(max(vec @ cov @ vec, 0.0)))
        z = float(est / se) if se > 0 else 0.0
        p = float(2 * (1 - norm.cdf(abs(z))))
        ci_low = float(est - 1.96 * se)
        ci_high = float(est + 1.96 * se)
        contrasts.append(
            {
                "factor": factor_name,
                "level_a": a,
                "level_b": b,
                "log_odds_diff": est,
                "std_error": se,
                "z_value": z,
                "p_value": p,
                "odds_ratio": float(np.exp(est)),
                "odds_ratio_ci_lower": float(np.exp(ci_low)),
                "odds_ratio_ci_upper": float(np.exp(ci_high)),
            }
        )
    return pd.DataFrame(contrasts)


def build_long_tables():
    aromalia_tables = []
    baseline_tables = {}
    for language in LANGUAGES:
        gt_path = os.path.join(GROUND_TRUTH_DIR, f"{language}.csv")
        aromalia_path = os.path.join(AROMALIA_SUMMARY_DIR, f"{language}.csv")
        gt_df = pd.read_csv(gt_path)
        ar_df = pd.read_csv(aromalia_path)
        aromalia_tables.append(to_long_format(language, gt_df, ar_df, "AromaLIA"))

    for tool_name, source in BASELINE_SOURCES.items():
        language = source["language"]
        gt_df = pd.read_csv(os.path.join(GROUND_TRUTH_DIR, f"{language}.csv"))
        bl_df = pd.read_csv(source["path"])
        baseline_tables[tool_name] = to_long_format(language, gt_df, bl_df, tool_name)

    aromalia_long = pd.concat(aromalia_tables, ignore_index=True)
    return aromalia_long, baseline_tables


def run_rq1(aromalia_long, baseline_tables):
    rows = []
    for tool_name, baseline_df in baseline_tables.items():
        merged = aromalia_long[aromalia_long["language"] == baseline_df["language"].iloc[0]].merge(
            baseline_df[["language", "filename", "smell", "correct"]],
            on=["language", "filename", "smell"],
            suffixes=("_aromalia", "_baseline"),
            how="inner",
        )
        b = int(((merged["correct_aromalia"] == 1) & (merged["correct_baseline"] == 0)).sum())
        c = int(((merged["correct_aromalia"] == 0) & (merged["correct_baseline"] == 1)).sum())
        stats = mcnemar_exact_test(b, c)
        rows.append(
            {
                "comparison": f"AromaLIA vs {tool_name}",
                "language": baseline_df["language"].iloc[0],
                "n_pairs": int(len(merged)),
                **stats,
            }
        )
    out = pd.DataFrame(rows)
    out["p_value_holm"] = holm_adjust(out["p_value"].tolist())
    out["significant_alpha_0_05"] = out["p_value_holm"] < ALPHA
    out.to_csv(RQ1_OUT, index=False)
    return out


def run_rq2_rq3(aromalia_long):
    df = aromalia_long.copy()
    df["instance_id"] = df["language"] + "::" + df["filename"]

    model = BinomialBayesMixedGLM.from_formula(
        "correct ~ C(language) + C(smell)",
        {"instance": "0 + C(instance_id)"},
        df,
    )
    result = model.fit_vb()

    summary_df = _coefficient_summary(result)
    language_p = _wald_block_test(summary_df, "C(language)")
    smell_p = _wald_block_test(summary_df, "C(smell)")
    omnibus = pd.DataFrame(
        [
            {"effect": "language", "p_value": language_p},
            {"effect": "smell", "p_value": smell_p},
        ]
    )
    omnibus["significant_alpha_0_05"] = omnibus["p_value"] < ALPHA
    omnibus.to_csv(RQ23_OMNIBUS_OUT, index=False)

    language_levels = sorted(df["language"].unique().tolist())
    smell_levels = sorted(df["smell"].unique().tolist())
    pair_lang = _pairwise_from_treatment(result, "language", language_levels)
    pair_smell = _pairwise_from_treatment(result, "smell", smell_levels)
    pairwise = pd.concat([pair_lang, pair_smell], ignore_index=True)
    pairwise["p_value_holm"] = np.nan
    for factor in pairwise["factor"].unique():
        mask = pairwise["factor"] == factor
        pairwise.loc[mask, "p_value_holm"] = holm_adjust(pairwise.loc[mask, "p_value"].tolist())
    pairwise["significant_alpha_0_05"] = pairwise["p_value_holm"] < ALPHA
    pairwise.to_csv(RQ23_PAIRWISE_OUT, index=False)
    return omnibus, pairwise


def write_interpretation(rq1_df, omnibus_df, pairwise_df):
    lines = [
        "# Statistical Interpretation for RQ1-RQ3",
        "",
        "## RQ1 - AromaLIA vs language-specific tools",
    ]
    for _, row in rq1_df.iterrows():
        verdict = "statistically significant" if row["significant_alpha_0_05"] else "not statistically significant"
        direction = "favors AromaLIA" if row["discordant_advantage"] > 0 else "favors baseline"
        lines.append(
            f"- {row['comparison']} ({row['language']}): {verdict} after Holm correction "
            f"(p={row['p_value_holm']:.4g}), discordant advantage={row['discordant_advantage']:.4f} ({direction})."
        )

    lines.extend(["", "## RQ2 and RQ3 - AromaLIA across languages and smells"])
    for _, row in omnibus_df.iterrows():
        verdict = "statistically significant" if row["significant_alpha_0_05"] else "not statistically significant"
        lines.append(f"- Omnibus effect of {row['effect']}: {verdict} (p={row['p_value']:.4g}).")

    sig_pairs = pairwise_df[pairwise_df["significant_alpha_0_05"]].copy()
    sig_pairs = sig_pairs.sort_values("p_value_holm")
    lines.extend(["", "### Significant pairwise contrasts (Holm-adjusted)"])
    if sig_pairs.empty:
        lines.append("- No significant pairwise contrasts were detected at alpha=0.05.")
    else:
        for _, row in sig_pairs.iterrows():
            lines.append(
                f"- {row['factor']}: {row['level_a']} vs {row['level_b']} "
                f"(OR={row['odds_ratio']:.3f}, 95% CI [{row['odds_ratio_ci_lower']:.3f}, {row['odds_ratio_ci_upper']:.3f}], "
                f"p={row['p_value_holm']:.4g})."
            )

    with open(INTERPRETATION_OUT, "w", encoding="utf-8") as f:
        f.write("\n".join(lines) + "\n")


def main():
    os.makedirs(RESULTS_DIR, exist_ok=True)
    aromalia_long, baseline_tables = build_long_tables()

    baseline_concat = pd.concat(baseline_tables.values(), ignore_index=True)
    pd.concat([aromalia_long, baseline_concat], ignore_index=True).to_csv(LONG_TABLE_OUT, index=False)

    rq1_df = run_rq1(aromalia_long, baseline_tables)
    omnibus_df, pairwise_df = run_rq2_rq3(aromalia_long)
    write_interpretation(rq1_df, omnibus_df, pairwise_df)

    print(f"✅ Long format table saved to: {LONG_TABLE_OUT}")
    print(f"✅ RQ1 tests saved to: {RQ1_OUT}")
    print(f"✅ RQ2/RQ3 omnibus tests saved to: {RQ23_OMNIBUS_OUT}")
    print(f"✅ RQ2/RQ3 pairwise tests saved to: {RQ23_PAIRWISE_OUT}")
    print(f"✅ Interpretation saved to: {INTERPRETATION_OUT}")


if __name__ == "__main__":
    main()
