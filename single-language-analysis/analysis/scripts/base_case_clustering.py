#!/usr/bin/env python3
"""Shared base-case identifiers and clustered bootstrap helpers.

The resampling / random-intercept unit is the base case id (001-166), shared
across the five language variants of each curated test. Source-project nesting
is exposed for disclosure only; it is not used as a variance component here
because 73 of 105 projects contribute a single base case.
"""

from __future__ import annotations

import os
import re
from urllib.parse import urlparse

import numpy as np
import pandas as pd
from sklearn.metrics import accuracy_score, f1_score, precision_score, recall_score

CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
DATASET_FILES_DIR = os.path.join(CURRENT_DIR, "..", "..", "dataset-files")
JAVA_SUMMARY = os.path.join(DATASET_FILES_DIR, "java", "summary.csv")

N_BOOTSTRAPS = 1000
CI_ALPHA = 0.95
BOOTSTRAP_SEED = 42


def extract_base_case_id(filename) -> str:
    match = re.search(r"(\d+)", str(filename))
    if not match:
        raise ValueError(f"Cannot extract base_case_id from filename: {filename!r}")
    return f"{int(match.group(1)):03d}"


def project_from_url(url: str) -> str:
    parts = urlparse(str(url)).path.strip("/").split("/")
    if len(parts) < 2:
        return str(url)
    return f"{parts[0]}/{parts[1]}"


def load_base_case_project_map(summary_path: str = JAVA_SUMMARY) -> dict[str, str]:
    """Map base_case_id -> GitHub owner/repo from the origin URL summary."""
    df = pd.read_csv(summary_path)
    name_col = "FileName" if "FileName" in df.columns else "filename"
    url_col = "OriginalURL" if "OriginalURL" in df.columns else "url"
    mapping = {}
    for _, row in df.iterrows():
        mapping[extract_base_case_id(row[name_col])] = project_from_url(row[url_col])
    return mapping


def compute_metrics_dict(y_true, y_pred, include_accuracy: bool = True) -> dict:
    out = {
        "Precision": float(precision_score(y_true, y_pred, zero_division=0)),
        "Recall": float(recall_score(y_true, y_pred, zero_division=0)),
        "F1": float(f1_score(y_true, y_pred, zero_division=0)),
    }
    if include_accuracy:
        out["Accuracy"] = float(accuracy_score(y_true, y_pred))
    return out


def _percentile_ci(values, alpha: float = CI_ALPHA):
    lower = (1.0 - alpha) / 2.0
    upper = 1.0 - lower
    arr = np.asarray(values, dtype=float)
    return float(np.percentile(arr, lower * 100)), float(np.percentile(arr, upper * 100))


def clustered_bootstrap_ci_from_groups(
    group_true: dict,
    group_pred: dict,
    n_bootstrap: int = N_BOOTSTRAPS,
    alpha: float = CI_ALPHA,
    seed: int = BOOTSTRAP_SEED,
    include_accuracy: bool = True,
) -> dict:
    """Percentile CI by resampling cluster ids with replacement.

    ``group_true`` / ``group_pred`` map cluster_id -> 1-d array of binary labels
    for all cells belonging to that cluster (e.g., all smells, or all
    language x smell cells for a base case).
    """
    cluster_ids = sorted(group_true.keys())
    if not cluster_ids:
        raise ValueError("No clusters provided for bootstrap")
    if set(group_true) != set(group_pred):
        raise ValueError("group_true and group_pred cluster keys differ")

    rng = np.random.default_rng(seed)
    n_clusters = len(cluster_ids)
    metric_names = ["Precision", "Recall", "F1"] + (["Accuracy"] if include_accuracy else [])
    boot = {name: [] for name in metric_names}

    for _ in range(n_bootstrap):
        draw = rng.choice(cluster_ids, size=n_clusters, replace=True)
        sample_true = np.concatenate([np.asarray(group_true[cid], dtype=int) for cid in draw])
        sample_pred = np.concatenate([np.asarray(group_pred[cid], dtype=int) for cid in draw])
        metrics = compute_metrics_dict(sample_true, sample_pred, include_accuracy=include_accuracy)
        for name in metric_names:
            boot[name].append(metrics[name])

    return {name: _percentile_ci(boot[name], alpha=alpha) for name in metric_names}


def build_file_level_groups(df_true: pd.DataFrame, df_pred: pd.DataFrame, smell_columns: list[str]):
    """One cluster per file (= base case within a single language)."""
    group_true = {}
    group_pred = {}
    for idx in range(len(df_true)):
        cid = extract_base_case_id(df_true.loc[idx, "filename"])
        group_true[cid] = df_true.loc[idx, smell_columns].astype(int).to_numpy()
        group_pred[cid] = df_pred.loc[idx, smell_columns].astype(int).to_numpy()
    return group_true, group_pred


def flatten_groups(group_true: dict, group_pred: dict):
    order = sorted(group_true.keys())
    y_true = np.concatenate([np.asarray(group_true[cid], dtype=int) for cid in order])
    y_pred = np.concatenate([np.asarray(group_pred[cid], dtype=int) for cid in order])
    return y_true, y_pred
