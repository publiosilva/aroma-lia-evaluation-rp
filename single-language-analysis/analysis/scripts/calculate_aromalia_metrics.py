#!/usr/bin/env python3
"""
compare_test_smells_multilang.py

Compares multiple pairs of ground truth and tool result CSVs
(one pair per programming language) to compute precision, recall, and F1.

Outputs:
  1. Per-language overall metrics
  2. Per-language per-smell metrics
  3. Global overall metrics (all languages combined)
"""

import os
import pandas as pd
import numpy as np
from sklearn.metrics import precision_score, recall_score, f1_score, accuracy_score

# === CONFIGURATION ===
LANGUAGES = ["java", "python", "csharp", "javascript", "typescript"]

CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))

# Folder structure (change as needed)
GROUND_TRUTH_DIR = os.path.join(CURRENT_DIR, "..", "..", "dataset-sheets", "ground-truth")
TOOL_RESULT_DIR = os.path.join(CURRENT_DIR, "..", "..", "tool-execution", "aromalia", "summary")

# Output files
OUTPUT_OVERALL_PER_LANGUAGE = os.path.join(CURRENT_DIR, "..", "results", "aromalia-overall-per-language-metrics.csv")
OUTPUT_PER_SMELL_PER_LANGUAGE = os.path.join(CURRENT_DIR, "..", "results", "aromalia-per-smell-per-language-metrics.csv")
OUTPUT_GLOBAL_METRICS = os.path.join(CURRENT_DIR, "..", "results", "aromalia-global-overall-metrics.csv")

os.makedirs(os.path.join(CURRENT_DIR, "..", "results"), exist_ok=True)

N_BOOTSTRAPS = 1000   # number of bootstrap iterations
CI_ALPHA = 0.95       # 95% confidence interval


# === FUNCTIONS ===

def compute_metrics(y_true, y_pred):
    """Compute precision, recall, F1, and accuracy."""
    return {
        "Precision": precision_score(y_true, y_pred, zero_division=0),
        "Recall": recall_score(y_true, y_pred, zero_division=0),
        "F1": f1_score(y_true, y_pred, zero_division=0),
        "Accuracy": accuracy_score(y_true, y_pred)
    }


def bootstrap_ci(y_true, y_pred, n_bootstrap=N_BOOTSTRAPS, alpha=CI_ALPHA):
    """Compute bootstrap confidence intervals for precision, recall, F1, and accuracy."""
    n = len(y_true)
    boot_metrics = {"Precision": [], "Recall": [], "F1": [], "Accuracy": []}

    for _ in range(n_bootstrap):
        idx = np.random.randint(0, n, n)
        sample_true = np.array(y_true)[idx]
        sample_pred = np.array(y_pred)[idx]
        m = compute_metrics(sample_true, sample_pred)
        for k in boot_metrics:
            boot_metrics[k].append(m[k])

    ci = {}
    lower = (1 - alpha) / 2
    upper = 1 - lower

    for metric in boot_metrics:
        ci[metric] = (
            np.percentile(boot_metrics[metric], lower * 100),
            np.percentile(boot_metrics[metric], upper * 100)
        )

    return ci


def evaluate_language(lang, ground_truth_path, result_path):
    """Compute per-smell and overall metrics (with CIs) for a single language."""
    df_true = pd.read_csv(ground_truth_path)
    df_pred = pd.read_csv(result_path)

    df_true = df_true.sort_values("filename").reset_index(drop=True)
    df_pred = df_pred.sort_values("filename").reset_index(drop=True)

    if not df_true["filename"].equals(df_pred["filename"]):
        raise ValueError(f"Filenames mismatch for language '{lang}'")

    # For C#, exclude "Exception Handling" test smell
    smell_columns = [c for c in df_true.columns if c != "filename" and not (lang == "csharp" and c == "Exception Handling")]

    per_smell = []
    all_true, all_pred = [], []

    for smell in smell_columns:
        y_true = df_true[smell].astype(int)
        y_pred = df_pred[smell].astype(int)
        metrics = compute_metrics(y_true, y_pred)
        ci = bootstrap_ci(y_true, y_pred)

        per_smell.append({
            "Language": lang,
            "TestSmell": smell,
            "Precision": metrics["Precision"],
            "Precision_CI_Lower": ci["Precision"][0],
            "Precision_CI_Upper": ci["Precision"][1],
            "Recall": metrics["Recall"],
            "Recall_CI_Lower": ci["Recall"][0],
            "Recall_CI_Upper": ci["Recall"][1],
            "F1": metrics["F1"],
            "F1_CI_Lower": ci["F1"][0],
            "F1_CI_Upper": ci["F1"][1],
            "Accuracy": metrics["Accuracy"],
            "Accuracy_CI_Lower": ci["Accuracy"][0],
            "Accuracy_CI_Upper": ci["Accuracy"][1],
        })

        all_true.extend(y_true)
        all_pred.extend(y_pred)

    # Overall metrics for this language
    overall_metrics = compute_metrics(all_true, all_pred)
    overall_ci = bootstrap_ci(all_true, all_pred)

    overall = {
        "Language": lang,
        "Precision": overall_metrics["Precision"],
        "Precision_CI_Lower": overall_ci["Precision"][0],
        "Precision_CI_Upper": overall_ci["Precision"][1],
        "Recall": overall_metrics["Recall"],
        "Recall_CI_Lower": overall_ci["Recall"][0],
        "Recall_CI_Upper": overall_ci["Recall"][1],
        "F1": overall_metrics["F1"],
        "F1_CI_Lower": overall_ci["F1"][0],
        "F1_CI_Upper": overall_ci["F1"][1],
        "Accuracy": overall_metrics["Accuracy"],
        "Accuracy_CI_Lower": overall_ci["Accuracy"][0],
        "Accuracy_CI_Upper": overall_ci["Accuracy"][1],
    }

    return per_smell, overall, all_true, all_pred


def main():
    all_per_smell = []
    all_overall = []
    global_true = []
    global_pred = []

    for lang in LANGUAGES:
        gt_file = os.path.join(GROUND_TRUTH_DIR, f"{lang}.csv")
        res_file = os.path.join(TOOL_RESULT_DIR, f"{lang}.csv")

        if not os.path.exists(gt_file) or not os.path.exists(res_file):
            print(f"⚠️ Skipping {lang}: missing file(s)")
            continue

        per_smell, overall, y_true_all, y_pred_all = evaluate_language(lang, gt_file, res_file)
        all_per_smell.extend(per_smell)
        all_overall.append(overall)
        global_true.extend(y_true_all)
        global_pred.extend(y_pred_all)

    # Compute global metrics
    global_metrics = compute_metrics(global_true, global_pred)
    global_ci = bootstrap_ci(global_true, global_pred)

    global_df = pd.DataFrame([{
        "Precision": global_metrics["Precision"],
        "Precision_CI_Lower": global_ci["Precision"][0],
        "Precision_CI_Upper": global_ci["Precision"][1],
        "Recall": global_metrics["Recall"],
        "Recall_CI_Lower": global_ci["Recall"][0],
        "Recall_CI_Upper": global_ci["Recall"][1],
        "F1": global_metrics["F1"],
        "F1_CI_Lower": global_ci["F1"][0],
        "F1_CI_Upper": global_ci["F1"][1],
        "Accuracy": global_metrics["Accuracy"],
        "Accuracy_CI_Lower": global_ci["Accuracy"][0],
        "Accuracy_CI_Upper": global_ci["Accuracy"][1],
    }])

    # Save results
    pd.DataFrame(all_per_smell).to_csv(OUTPUT_PER_SMELL_PER_LANGUAGE, index=False)
    pd.DataFrame(all_overall).to_csv(OUTPUT_OVERALL_PER_LANGUAGE, index=False)
    global_df.to_csv(OUTPUT_GLOBAL_METRICS, index=False)

    print(f"✅ Per-smell metrics (with CI) → {OUTPUT_PER_SMELL_PER_LANGUAGE}")
    print(f"✅ Overall per-language metrics (with CI) → {OUTPUT_OVERALL_PER_LANGUAGE}")
    print(f"✅ Global metrics (with CI) → {OUTPUT_GLOBAL_METRICS}")


if __name__ == "__main__":
    main()
