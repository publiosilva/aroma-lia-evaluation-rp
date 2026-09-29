#!/usr/bin/env python3
"""
compare_test_smells_multilang.py

Compares multiple pairs of ground truth and tool result CSVs
(one pair per programming language) to compute precision, recall, and F1.

Bootstrap confidence intervals resample the 166 base-case clusters with
replacement (percentile method, 1,000 iterations). Within a language, each
file is one base case; globally, each base case contributes all of its
language x smell cells.

Outputs:
  1. Per-language overall metrics
  2. Per-language per-smell metrics
  3. Global overall metrics (all languages combined)
  4. Cross-language per-smell / per-category aggregates used by RQ3 charts
"""

import os

import numpy as np
import pandas as pd

from base_case_clustering import (
    BOOTSTRAP_SEED,
    CI_ALPHA,
    N_BOOTSTRAPS,
    build_file_level_groups,
    clustered_bootstrap_ci_from_groups,
    compute_metrics_dict,
    extract_base_case_id,
    flatten_groups,
)

# === CONFIGURATION ===
LANGUAGES = ["java", "python", "csharp", "javascript", "typescript"]

CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))

GROUND_TRUTH_DIR = os.path.join(CURRENT_DIR, "..", "..", "dataset-sheets", "ground-truth")
TOOL_RESULT_DIR = os.path.join(CURRENT_DIR, "..", "..", "tool-execution", "aromalia", "summary")

OUTPUT_OVERALL_PER_LANGUAGE = os.path.join(CURRENT_DIR, "..", "results", "aromalia-overall-per-language-metrics.csv")
OUTPUT_PER_SMELL_PER_LANGUAGE = os.path.join(CURRENT_DIR, "..", "results", "aromalia-per-smell-per-language-metrics.csv")
OUTPUT_GLOBAL_METRICS = os.path.join(CURRENT_DIR, "..", "results", "aromalia-global-overall-metrics.csv")
OUTPUT_PER_SMELL_AGG = os.path.join(CURRENT_DIR, "..", "results", "aromalia-per-smell-aggregated-metrics.csv")
OUTPUT_PER_CATEGORY_AGG = os.path.join(CURRENT_DIR, "..", "results", "aromalia-per-category-aggregated-metrics.csv")

os.makedirs(os.path.join(CURRENT_DIR, "..", "results"), exist_ok=True)

SMELL_CATEGORIES = {
    "AssertionRoulette": "Test semantic - logic",
    "ConditionalTestLogic": "Test semantic - logic",
    "DuplicateAssert": "Code related",
    "EmptyTest": "Code related",
    "IgnoredTest": "Code related",
    "MagicNumberTest": "Code related",
    "RedundantPrint": "Test execution - behavior",
    "SleepyTest": "Test execution - behavior",
    "ExceptionHandling": "Issues in test steps",
    "UnknownTest": "Design related",
}


def _ci_row(metrics: dict, ci: dict) -> dict:
    row = {}
    for key, value in metrics.items():
        row[key] = value
        row[f"{key}_CI_Lower"] = ci[key][0]
        row[f"{key}_CI_Upper"] = ci[key][1]
    return row


def evaluate_language(lang, ground_truth_path, result_path):
    """Compute per-smell and overall metrics (with clustered CIs) for one language."""
    df_true = pd.read_csv(ground_truth_path).sort_values("filename").reset_index(drop=True)
    df_pred = pd.read_csv(result_path).sort_values("filename").reset_index(drop=True)

    if not df_true["filename"].equals(df_pred["filename"]):
        raise ValueError(f"Filenames mismatch for language '{lang}'")

    smell_columns = [
        c
        for c in df_true.columns
        if c != "filename" and not (lang == "csharp" and c == "ExceptionHandling")
    ]

    group_true, group_pred = build_file_level_groups(df_true, df_pred, smell_columns)
    overall_true, overall_pred = flatten_groups(group_true, group_pred)
    overall_metrics = compute_metrics_dict(overall_true, overall_pred, include_accuracy=True)
    overall_ci = clustered_bootstrap_ci_from_groups(
        group_true, group_pred, include_accuracy=True
    )
    overall = {"Language": lang, **_ci_row(overall_metrics, overall_ci)}

    per_smell = []
    for smell in smell_columns:
        smell_true = {
            extract_base_case_id(df_true.loc[i, "filename"]): np.asarray(
                [int(df_true.loc[i, smell])]
            )
            for i in range(len(df_true))
        }
        smell_pred = {
            extract_base_case_id(df_pred.loc[i, "filename"]): np.asarray(
                [int(df_pred.loc[i, smell])]
            )
            for i in range(len(df_pred))
        }
        y_true, y_pred = flatten_groups(smell_true, smell_pred)
        metrics = compute_metrics_dict(y_true, y_pred, include_accuracy=True)
        ci = clustered_bootstrap_ci_from_groups(smell_true, smell_pred, include_accuracy=True)
        per_smell.append({"Language": lang, "TestSmell": smell, **_ci_row(metrics, ci)})

    cell_records = []
    for i in range(len(df_true)):
        base_id = extract_base_case_id(df_true.loc[i, "filename"])
        for smell in smell_columns:
            cell_records.append(
                {
                    "language": lang,
                    "base_case_id": base_id,
                    "smell": smell,
                    "y_true": int(df_true.loc[i, smell]),
                    "y_pred": int(df_pred.loc[i, smell]),
                }
            )

    return per_smell, overall, cell_records


def _mean_language_f1(cell_df: pd.DataFrame, languages: list[str]) -> float:
    f1s = []
    for lang in languages:
        subset = cell_df[cell_df["language"] == lang]
        if subset.empty:
            continue
        f1s.append(
            compute_metrics_dict(subset["y_true"], subset["y_pred"], include_accuracy=False)["F1"]
        )
    return float(np.mean(f1s)) if f1s else float("nan")


def clustered_mean_language_f1_ci(cell_df: pd.DataFrame, languages: list[str]):
    """Bootstrap CI for the mean of per-language F1 scores, clustering by base case."""
    clusters = sorted(cell_df["base_case_id"].unique())
    rng = np.random.default_rng(BOOTSTRAP_SEED)
    boots = []
    for _ in range(N_BOOTSTRAPS):
        draw = rng.choice(clusters, size=len(clusters), replace=True)
        parts = []
        for cid in draw:
            parts.append(cell_df[cell_df["base_case_id"] == cid])
        sample = pd.concat(parts, ignore_index=True)
        boots.append(_mean_language_f1(sample, languages))
    lower = (1.0 - CI_ALPHA) / 2.0
    upper = 1.0 - lower
    return float(np.percentile(boots, lower * 100)), float(np.percentile(boots, upper * 100))


def build_aggregates(cell_df: pd.DataFrame):
    smell_rows = []
    for smell, smell_df in cell_df.groupby("smell"):
        languages = sorted(smell_df["language"].unique())
        point = _mean_language_f1(smell_df, languages)
        ci_low, ci_high = clustered_mean_language_f1_ci(smell_df, languages)
        smell_rows.append(
            {
                "TestSmell": smell,
                "F1": point,
                "F1_CI_Lower": ci_low,
                "F1_CI_Upper": ci_high,
            }
        )
    smell_df = pd.DataFrame(smell_rows)

    category_rows = []
    cell_df = cell_df.copy()
    cell_df["category"] = cell_df["smell"].map(SMELL_CATEGORIES)
    for category, cat_df in cell_df.groupby("category"):
        # Mean of (smell, language) F1 values within the category — matches prior paper estimand.
        pair_f1s = []
        for (smell, lang), sub in cat_df.groupby(["smell", "language"]):
            pair_f1s.append(
                compute_metrics_dict(sub["y_true"], sub["y_pred"], include_accuracy=False)["F1"]
            )
        point = float(np.mean(pair_f1s))

        clusters = sorted(cat_df["base_case_id"].unique())
        rng = np.random.default_rng(BOOTSTRAP_SEED)
        boots = []
        for _ in range(N_BOOTSTRAPS):
            draw = rng.choice(clusters, size=len(clusters), replace=True)
            sample = pd.concat([cat_df[cat_df["base_case_id"] == cid] for cid in draw], ignore_index=True)
            boot_vals = []
            for (smell, lang), sub in sample.groupby(["smell", "language"]):
                boot_vals.append(
                    compute_metrics_dict(sub["y_true"], sub["y_pred"], include_accuracy=False)["F1"]
                )
            boots.append(float(np.mean(boot_vals)) if boot_vals else float("nan"))
        lower = (1.0 - CI_ALPHA) / 2.0
        upper = 1.0 - lower
        category_rows.append(
            {
                "Category": category,
                "F1": point,
                "F1_CI_Lower": float(np.percentile(boots, lower * 100)),
                "F1_CI_Upper": float(np.percentile(boots, upper * 100)),
            }
        )
    return smell_df, pd.DataFrame(category_rows)


def main():
    all_per_smell = []
    all_overall = []
    all_cells = []

    for lang in LANGUAGES:
        gt_file = os.path.join(GROUND_TRUTH_DIR, f"{lang}.csv")
        res_file = os.path.join(TOOL_RESULT_DIR, f"{lang}.csv")

        if not os.path.exists(gt_file) or not os.path.exists(res_file):
            print(f"⚠️ Skipping {lang}: missing file(s)")
            continue

        per_smell, overall, cells = evaluate_language(lang, gt_file, res_file)
        all_per_smell.extend(per_smell)
        all_overall.append(overall)
        all_cells.extend(cells)

    cell_df = pd.DataFrame(all_cells)

    # Global metrics: cluster by base case across all languages.
    global_true = {}
    global_pred = {}
    for base_id, sub in cell_df.groupby("base_case_id"):
        global_true[base_id] = sub["y_true"].to_numpy(dtype=int)
        global_pred[base_id] = sub["y_pred"].to_numpy(dtype=int)
    g_true, g_pred = flatten_groups(global_true, global_pred)
    global_metrics = compute_metrics_dict(g_true, g_pred, include_accuracy=True)
    global_ci = clustered_bootstrap_ci_from_groups(global_true, global_pred, include_accuracy=True)
    global_df = pd.DataFrame([{**_ci_row(global_metrics, global_ci)}])

    smell_agg, category_agg = build_aggregates(cell_df)

    pd.DataFrame(all_per_smell).to_csv(OUTPUT_PER_SMELL_PER_LANGUAGE, index=False)
    pd.DataFrame(all_overall).to_csv(OUTPUT_OVERALL_PER_LANGUAGE, index=False)
    global_df.to_csv(OUTPUT_GLOBAL_METRICS, index=False)
    smell_agg.to_csv(OUTPUT_PER_SMELL_AGG, index=False)
    category_agg.to_csv(OUTPUT_PER_CATEGORY_AGG, index=False)

    print(f"✅ Per-smell metrics (with CI) → {OUTPUT_PER_SMELL_PER_LANGUAGE}")
    print(f"✅ Overall per-language metrics (with CI) → {OUTPUT_OVERALL_PER_LANGUAGE}")
    print(f"✅ Global metrics (with CI) → {OUTPUT_GLOBAL_METRICS}")
    print(f"✅ Aggregated per-smell metrics (with CI) → {OUTPUT_PER_SMELL_AGG}")
    print(f"✅ Aggregated per-category metrics (with CI) → {OUTPUT_PER_CATEGORY_AGG}")


if __name__ == "__main__":
    main()
