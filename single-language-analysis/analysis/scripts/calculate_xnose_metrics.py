#!/usr/bin/env python3
"""
compare_test_smells.py — xNose (C#) metrics with base-case clustered bootstrap.
"""

import os

import numpy as np
import pandas as pd

from base_case_clustering import (
    build_file_level_groups,
    clustered_bootstrap_ci_from_groups,
    compute_metrics_dict,
    extract_base_case_id,
    flatten_groups,
)

CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))

GROUND_TRUTH_FILE = os.path.join(CURRENT_DIR, "..", "..", "dataset-sheets", "ground-truth", "csharp.csv")
TOOL_RESULT_FILE = os.path.join(CURRENT_DIR, "..", "..", "tool-execution", "xnose", "summary", "xnose-detections.csv")

OUTPUT_OVERALL_METRICS = os.path.join(CURRENT_DIR, "..", "results", "xnose-overall-metrics.csv")
OUTPUT_PER_SMELL_METRICS = os.path.join(CURRENT_DIR, "..", "results", "xnose-per-smell-metrics.csv")

os.makedirs(os.path.join(CURRENT_DIR, "..", "results"), exist_ok=True)


def _ci_row(metrics: dict, ci: dict, keys=("Precision", "Recall", "F1")) -> dict:
    row = {}
    for key in keys:
        row[key] = metrics[key]
        row[f"{key}_CI_Lower"] = ci[key][0]
        row[f"{key}_CI_Upper"] = ci[key][1]
    return row


def main():
    df_true = pd.read_csv(GROUND_TRUTH_FILE).sort_values("filename").reset_index(drop=True)
    df_pred = pd.read_csv(TOOL_RESULT_FILE).sort_values("filename").reset_index(drop=True)

    if not df_true["filename"].equals(df_pred["filename"]):
        raise ValueError("Filenames between ground truth and result CSVs do not match!")

    smell_columns = [c for c in df_true.columns if c != "filename" and c != "ExceptionHandling"]

    group_true, group_pred = build_file_level_groups(df_true, df_pred, smell_columns)
    overall_true, overall_pred = flatten_groups(group_true, group_pred)
    overall_metrics = compute_metrics_dict(overall_true, overall_pred, include_accuracy=False)
    overall_ci = clustered_bootstrap_ci_from_groups(
        group_true, group_pred, include_accuracy=False
    )

    per_smell_data = []
    for smell in smell_columns:
        smell_true = {
            extract_base_case_id(df_true.loc[i, "filename"]): np.asarray([int(df_true.loc[i, smell])])
            for i in range(len(df_true))
        }
        smell_pred = {
            extract_base_case_id(df_pred.loc[i, "filename"]): np.asarray([int(df_pred.loc[i, smell])])
            for i in range(len(df_pred))
        }
        y_true, y_pred = flatten_groups(smell_true, smell_pred)
        metrics = compute_metrics_dict(y_true, y_pred, include_accuracy=False)
        ci = clustered_bootstrap_ci_from_groups(smell_true, smell_pred, include_accuracy=False)
        per_smell_data.append({"TestSmell": smell, **_ci_row(metrics, ci)})

    pd.DataFrame(per_smell_data).to_csv(OUTPUT_PER_SMELL_METRICS, index=False)
    pd.DataFrame([_ci_row(overall_metrics, overall_ci)]).to_csv(OUTPUT_OVERALL_METRICS, index=False)

    print(f"✅ Overall metrics saved to: {OUTPUT_OVERALL_METRICS}")
    print(f"✅ Per-test-smell metrics saved to: {OUTPUT_PER_SMELL_METRICS}")


if __name__ == "__main__":
    main()
