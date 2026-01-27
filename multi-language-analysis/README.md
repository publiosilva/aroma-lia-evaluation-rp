# Multi-Language Analysis

This directory contains the evaluation results for AromaLIA using projects that utilize multiple programming languages.

## Purpose

Unlike the single-language analysis (see [`../single-language-analysis/`](../single-language-analysis/)), this analysis evaluates AromaLIA's performance on projects that contain code written in multiple programming languages. This helps assess how well AromaLIA handles real-world scenarios where projects are polyglot (using multiple languages).

## Structure

```
multi-language-analysis/
├── tool-execution/                 # Tool outputs from multi-language projects
│   ├── aromadr/                   # AromaLIA results for multi-language projects
│   │   ├── beam-java-test-smells-simplified.json
│   │   ├── beam-python-test-smells-simplified.json
│   │   └── [other files]
│   ├── pytest-smell/              # pytest-smell results (Python)
│   │   └── smells.csv
│   └── tsdetect/                  # TSDetect results (Java)
│       └── output.csv
│
└── results/                       # Summary and aggregated results
    ├── aromadr-java-test-smells.csv
    ├── aromadr-python-test-smells.csv
    ├── pytest-smell-python-test-smells.csv
    ├── tsdetect-java-test-smells.csv
    └── test-smells-summary.csv
```

## Differences from Single-Language Analysis

1. **Project Selection**: Projects analyzed here contain code in multiple languages (e.g., Apache Beam contains both Java and Python code)
2. **Tool Execution**: Tools are run on multi-language projects, testing cross-language detection capabilities
3. **Results Format**: Results are organized by tool and language, showing how each tool performs on different language components within the same project

## Usage

The results in this directory complement the single-language analysis by providing insights into:
- How AromaLIA performs on polyglot projects
- Whether language independence holds true across mixed-language codebases
- Comparison with language-specific tools on multi-language projects

For detailed analysis scripts and methodology, refer to the [`../single-language-analysis/`](../single-language-analysis/) directory, which contains the main evaluation framework.
