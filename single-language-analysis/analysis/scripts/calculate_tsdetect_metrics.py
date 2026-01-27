#!/usr/bin/env python3
"""
compare_test_smells.py

This script compares a ground truth CSV file and a tool result CSV file
to compute precision, recall, and F1 score.

It generates:
  1. A CSV with overall metrics.
  2. A CSV with per-test-smell metrics.
"""

import os
import pandas as pd
import numpy as np
from sklearn.metrics import precision_score, recall_score, f1_score

CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))

# === CONFIGURATION ===
GROUND_TRUTH_FILE = os.path.join(CURRENT_DIR, "..", "..", "dataset-sheets", "ground-truth", "java.csv")
TOOL_RESULT_FILE = os.path.join(CURRENT_DIR, "..", "..", "tool-execution", "tsdetect", "summary", "tsdetect-detections.csv")

OUTPUT_OVERALL_METRICS = os.path.join(CURRENT_DIR, "..", "results", "tsdetect-overall-metrics.csv")
OUTPUT_PER_SMELL_METRICS = os.path.join(CURRENT_DIR, "..", "results", "tsdetect-per-smell-metrics.csv")

os.makedirs(os.path.join(CURRENT_DIR, "..", "results"), exist_ok=True)

N_BOOTSTRAPS = 1000   # number of bootstrap iterations
CI_ALPHA = 0.95       # 95% confidence interval

# === FUNCTIONS ===


def compute_metrics(y_true, y_pred):
    """Compute precision, recall and F1 given two binary lists."""
    precision = precision_score(y_true, y_pred, zero_division=0)
    recall = recall_score(y_true, y_pred, zero_division=0)
    f1 = f1_score(y_true, y_pred, zero_division=0)
    return precision, recall, f1


def bootstrap_ci(y_true, y_pred, n_bootstrap=N_BOOTSTRAPS, alpha=CI_ALPHA):
    """Compute bootstrap confidence intervals for precision, recall, and F1."""
    n = len(y_true)
    boot_metrics = {"Precision": [], "Recall": [], "F1": []}

    for _ in range(n_bootstrap):
        idx = np.random.randint(0, n, n)
        sample_true = np.array(y_true)[idx]
        sample_pred = np.array(y_pred)[idx]
        precision, recall, f1 = compute_metrics(sample_true, sample_pred)
        boot_metrics["Precision"].append(precision)
        boot_metrics["Recall"].append(recall)
        boot_metrics["F1"].append(f1)

    ci = {}
    lower = (1 - alpha) / 2
    upper = 1 - lower

    for metric in boot_metrics:
        ci[metric] = (
            np.percentile(boot_metrics[metric], lower * 100),
            np.percentile(boot_metrics[metric], upper * 100)
        )

    return ci


def main():
    # Load CSVs
    df_true = pd.read_csv(GROUND_TRUTH_FILE)
    df_pred = pd.read_csv(TOOL_RESULT_FILE)

    # Ensure alignment by filename
    df_true = df_true.sort_values("filename").reset_index(drop=True)
    df_pred = df_pred.sort_values("filename").reset_index(drop=True)

    # Check that filenames match
    if not (df_true["filename"].equals(df_pred["filename"])):
        raise ValueError(
            "Filenames between ground truth and result CSVs do not match!")

    # Get smell columns (exclude filename)
    smell_columns = [col for col in df_true.columns if col != "filename"]

    # Compute per-smell metrics
    per_smell_data = []
    all_true = []
    all_pred = []

    for smell in smell_columns:
        y_true = df_true[smell].astype(int)
        y_pred = df_pred[smell].astype(int)

        precision, recall, f1 = compute_metrics(y_true, y_pred)
        ci = bootstrap_ci(y_true, y_pred)
        per_smell_data.append({
            "TestSmell": smell,
            "Precision": precision,
            "Precision_CI_Lower": ci["Precision"][0],
            "Precision_CI_Upper": ci["Precision"][1],
            "Recall": recall,
            "Recall_CI_Lower": ci["Recall"][0],
            "Recall_CI_Upper": ci["Recall"][1],
            "F1": f1,
            "F1_CI_Lower": ci["F1"][0],
            "F1_CI_Upper": ci["F1"][1]
        })

        all_true.extend(y_true)
        all_pred.extend(y_pred)

    # Compute overall metrics
    overall_precision, overall_recall, overall_f1 = compute_metrics(
        all_true, all_pred)
    overall_ci = bootstrap_ci(all_true, all_pred)
    overall_df = pd.DataFrame([{
        "Precision": overall_precision,
        "Precision_CI_Lower": overall_ci["Precision"][0],
        "Precision_CI_Upper": overall_ci["Precision"][1],
        "Recall": overall_recall,
        "F1": overall_f1,
        "Recall_CI_Lower": overall_ci["Recall"][0],
        "Recall_CI_Upper": overall_ci["Recall"][1],
        "F1_CI_Lower": overall_ci["F1"][0],
        "F1_CI_Upper": overall_ci["F1"][1]
    }])

    # Save results
    per_smell_df = pd.DataFrame(per_smell_data)
    per_smell_df.to_csv(OUTPUT_PER_SMELL_METRICS, index=False)
    overall_df.to_csv(OUTPUT_OVERALL_METRICS, index=False)

    print(f"✅ Overall metrics saved to: {OUTPUT_OVERALL_METRICS}")
    print(f"✅ Per-test-smell metrics saved to: {OUTPUT_PER_SMELL_METRICS}")


if __name__ == "__main__":
    main()
