#!/usr/bin/env python3
"""Draw a fixed labeling sample and inline the source files.

Run once from the repository root or from anywhere; the output path is
relative to this script. CI does not run this script, so the committed
sample stays stable.
"""

from __future__ import annotations

import json
import random
from pathlib import Path

SEED = 20261110
JAVA_COUNT = 42
PYTHON_COUNT = 41

SCRIPT_DIR = Path(__file__).resolve().parent
REPO_ROOT = SCRIPT_DIR.parents[1]
JAVA_DIR = REPO_ROOT / "single-language-analysis" / "dataset-files" / "java"
PYTHON_DIR = REPO_ROOT / "single-language-analysis" / "dataset-files" / "python"
OUTPUT = SCRIPT_DIR.parent / "src" / "sample.json"


def main() -> None:
    java_files = sorted(JAVA_DIR.glob("*.java"))
    python_files = sorted(PYTHON_DIR.glob("*.py"))
    if len(java_files) < JAVA_COUNT or len(python_files) < PYTHON_COUNT:
        raise SystemExit(
            f"Not enough source files (java={len(java_files)}, python={len(python_files)})"
        )

    rng = random.Random(SEED)
    chosen = [("java", path) for path in rng.sample(java_files, JAVA_COUNT)]
    chosen += [("python", path) for path in rng.sample(python_files, PYTHON_COUNT)]
    rng.shuffle(chosen)

    payload = {
        "seed": SEED,
        "files": [
            {
                "filename": path.name,
                "language": language,
                "code": path.read_text(encoding="utf-8"),
            }
            for language, path in chosen
        ],
    }

    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    java_n = sum(1 for language, _ in chosen if language == "java")
    python_n = sum(1 for language, _ in chosen if language == "python")
    print(f"Wrote {len(chosen)} files ({java_n} Java, {python_n} Python) to {OUTPUT}")


if __name__ == "__main__":
    main()
