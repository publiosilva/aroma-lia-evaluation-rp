#!/usr/bin/env python3
"""Enumerate all baseline FP/FN and assign mechanical cause-class clusters.

Cause classes (each error counted once):
  - test_discovery_silent: FN on a file where the tool emitted zero detections
  - smell_operationalization_fp: concentrated FP mass
        TSDETECT MagicNumberTest FP; xNose DuplicateAssert FP
  - other_unresolved: remaining FP/FN (no per-file root cause claimed)

Writes analysis/results/baseline-error-categorization.csv
and prints a summary table.
"""

from __future__ import annotations

import csv
from collections import Counter, defaultdict
from pathlib import Path

CURRENT_DIR = Path(__file__).resolve().parent
ROOT = CURRENT_DIR.parent.parent  # single-language-analysis
GT_DIR = ROOT / "dataset-sheets" / "ground-truth"
TOOL_DIR = ROOT / "tool-execution"
OUT_CSV = CURRENT_DIR.parent / "results" / "baseline-error-categorization.csv"

SMELLS = [
    "AssertionRoulette",
    "ConditionalTestLogic",
    "DuplicateAssert",
    "EmptyTest",
    "ExceptionHandling",
    "IgnoredTest",
    "MagicNumberTest",
    "RedundantPrint",
    "SleepyTest",
    "UnknownTest",
]

BASELINES = {
    "pytest-smell": {
        "language": "python",
        "gt": GT_DIR / "python.csv",
        "pred": TOOL_DIR / "pytest-smell" / "summary" / "pytest-smell-detections.csv",
        "drop_smells": [],
        "op_fp_smell": None,
    },
    "TSDETECT": {
        "language": "java",
        "gt": GT_DIR / "java.csv",
        "pred": TOOL_DIR / "tsdetect" / "summary" / "tsdetect-detections.csv",
        "drop_smells": [],
        "op_fp_smell": "MagicNumberTest",
    },
    "xNose": {
        "language": "csharp",
        "gt": GT_DIR / "csharp.csv",
        "pred": TOOL_DIR / "xnose" / "summary" / "xnose-detections.csv",
        "drop_smells": ["ExceptionHandling"],
        "op_fp_smell": "DuplicateAssert",
    },
}


def load_csv(path: Path) -> list[dict]:
    with path.open(newline="", encoding="utf-8") as f:
        return list(csv.DictReader(f))


def filename_key(row: dict) -> str:
    for k in row:
        if k.lower() == "filename":
            return k
    raise KeyError(f"No filename column in {list(row)}")


def to_maps(rows: list[dict], drop_smells: list[str]):
    drop = set(drop_smells)
    smells = [s for s in SMELLS if s not in drop]
    key = filename_key(rows[0])
    by_file = {}
    for row in rows:
        name = row[key]
        by_file[name] = {s: int(row[s]) for s in smells}
    return by_file, smells


def categorize(tool: str, cfg: dict) -> list[dict]:
    gt_rows = load_csv(cfg["gt"])
    pred_rows = load_csv(cfg["pred"])
    gt, smells = to_maps(gt_rows, cfg["drop_smells"])
    pred, _ = to_maps(pred_rows, cfg["drop_smells"])

    if set(gt) != set(pred):
        missing_gt = set(pred) - set(gt)
        missing_pred = set(gt) - set(pred)
        raise ValueError(f"{tool}: filename mismatch gt-only={missing_pred} pred-only={missing_gt}")

    records = []
    for name in sorted(gt):
        silent = all(pred[name][s] == 0 for s in smells)
        for smell in smells:
            y_true = gt[name][smell]
            y_pred = pred[name][smell]
            if y_true == y_pred:
                continue
            kind = "FP" if (y_pred == 1 and y_true == 0) else "FN"
            if kind == "FN" and silent:
                cause = "test_discovery_silent"
            elif kind == "FP" and cfg["op_fp_smell"] == smell:
                cause = "smell_operationalization_fp"
            else:
                cause = "other_unresolved"
            records.append(
                {
                    "tool": tool,
                    "language": cfg["language"],
                    "filename": name,
                    "smell": smell,
                    "error_type": kind,
                    "cause_class": cause,
                    "y_true": y_true,
                    "y_pred": y_pred,
                }
            )
    return records


def main():
    all_records = []
    for tool, cfg in BASELINES.items():
        all_records.extend(categorize(tool, cfg))

    OUT_CSV.parent.mkdir(parents=True, exist_ok=True)
    with OUT_CSV.open("w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(
            f,
            fieldnames=[
                "tool",
                "language",
                "filename",
                "smell",
                "error_type",
                "cause_class",
                "y_true",
                "y_pred",
            ],
        )
        writer.writeheader()
        writer.writerows(all_records)

    print(f"Wrote {len(all_records)} errors → {OUT_CSV}")
    print()
    print(f"{'Tool':<14} {'Discovery':>10} {'OpFP':>8} {'Other':>8} {'Total':>8}")
    by_tool = defaultdict(Counter)
    for r in all_records:
        by_tool[r["tool"]][r["cause_class"]] += 1
    for tool in BASELINES:
        c = by_tool[tool]
        d = c["test_discovery_silent"]
        o = c["smell_operationalization_fp"]
        u = c["other_unresolved"]
        print(f"{tool:<14} {d:10d} {o:8d} {u:8d} {d+o+u:8d}")
    print()
    # silent-file counts
    for tool, cfg in BASELINES.items():
        pred_rows = load_csv(cfg["pred"])
        pred, smells = to_maps(pred_rows, cfg["drop_smells"])
        silent_files = sum(1 for name in pred if all(pred[name][s] == 0 for s in smells))
        print(f"{tool}: silent files = {silent_files}/{len(pred)}")


if __name__ == "__main__":
    main()
