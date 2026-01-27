# AromaLIA: A Language-Independent Approach to Detect Test Smells

## Abstract

Tests play a crucial role in ensuring the quality and reliability of software systems. However, test code is often susceptible to issues that can compromise its effectiveness and hinder long-term maintainability. Among these issues are *test smells*, which are poor design choices made by developers when writing test code. In recent years, this topic has gained significant attention, with numerous studies proposing techniques for detecting test smells across various programming languages. Although test smells are conceptually similar across languages, most existing detection approaches are language-specific, which limits their applicability and reusability. To address this limitation, we introduce *AromaLIA*, a language-independent approach for detecting test smells. Unlike existing solutions, AromaLIA employs a unified detection mechanism to detect test smells across multiple programming languages. To validate our approach, we developed a tool implementing AromaLIA for detecting ten types of test smells in five languages: C#, Java, Python, JavaScript, and TypeScript. We evaluated its effectiveness against three existing language-specific test smell detection tools using a pre-classified, manually validated dataset containing 830 instances of test smells. The AromaLIA-based tool achieved a precision of 0.97, a recall of 0.96, and an F1-score of 0.97, outperforming all three language-specific tools. AromaLIA paves the way for more reusable and broadly applicable test smell detection solutions, reducing the effort required to support new programming languages and advancing the state of cross-language software quality analysis.

## Repository Structure

This repository contains two parallel analyses evaluating AromaLIA:

1. **Single-Language Analysis**: Evaluation using projects that use a single programming language
2. **Multi-Language Analysis**: Evaluation using projects that use multiple programming languages

```
├── [single-language-analysis/](single-language-analysis/)          # Analysis of projects using a single language
│   ├── [analysis/](single-language-analysis/analysis/)                      # Analysis scripts and results
│   │   ├── [scripts/](single-language-analysis/analysis/scripts/)                   # Python scripts for metric calculation and visualization
│   │   │   ├── [calculate_aromalia_metrics.py](single-language-analysis/analysis/scripts/calculate_aromalia_metrics.py)
│   │   │   ├── [calculate_pytest_smell_metrics.py](single-language-analysis/analysis/scripts/calculate_pytest_smell_metrics.py)
│   │   │   ├── [calculate_tsdetect_metrics.py](single-language-analysis/analysis/scripts/calculate_tsdetect_metrics.py)
│   │   │   ├── [calculate_xnose_metrics.py](single-language-analysis/analysis/scripts/calculate_xnose_metrics.py)
│   │   │   ├── [generate_rq1_charts.py](single-language-analysis/analysis/scripts/generate_rq1_charts.py)     # RQ1: Tool comparison charts
│   │   │   ├── [generate_rq2_charts.py](single-language-analysis/analysis/scripts/generate_rq2_charts.py)     # RQ2: Per-language performance charts
│   │   │   └── [generate_rq3_charts.py](single-language-analysis/analysis/scripts/generate_rq3_charts.py)     # RQ3: Per-smell analysis charts
│   │   └── [results/](single-language-analysis/analysis/results/)                   # Generated metrics and figures
│   │       ├── [aromalia-global-overall-metrics.csv](single-language-analysis/analysis/results/aromalia-global-overall-metrics.csv)
│   │       ├── [aromalia-overall-per-language-metrics.csv](single-language-analysis/analysis/results/aromalia-overall-per-language-metrics.csv)
│   │       ├── [aromalia-per-smell-per-language-metrics.csv](single-language-analysis/analysis/results/aromalia-per-smell-per-language-metrics.csv)
│   │       └── [PDF figures](single-language-analysis/analysis/results/)
│   │
│   ├── [dataset-files/](single-language-analysis/dataset-files/)                     # Test smell instances (830 total)
│   │   ├── [CSharp/](single-language-analysis/dataset-files/CSharp/)                        # 166 C# test files
│   │   ├── [java/](single-language-analysis/dataset-files/java/)                          # 166 Java test files
│   │   ├── [javascript/](single-language-analysis/dataset-files/javascript/)                    # 166 JavaScript test files
│   │   ├── [python/](single-language-analysis/dataset-files/python/)                        # 166 Python test files
│   │   └── [typescript/](single-language-analysis/dataset-files/typescript/)                    # 166 TypeScript test files
│   │
│   ├── [dataset-sheets/](single-language-analysis/dataset-sheets/)                    # Ground truth and metadata
│   │   ├── [ground-truth/](single-language-analysis/dataset-sheets/ground-truth/)                  # Manually validated classifications
│   │   │   ├── [csharp.csv](single-language-analysis/dataset-sheets/ground-truth/csharp.csv)
│   │   │   ├── [java.csv](single-language-analysis/dataset-sheets/ground-truth/java.csv)
│   │   │   ├── [javascript.csv](single-language-analysis/dataset-sheets/ground-truth/javascript.csv)
│   │   │   ├── [python.csv](single-language-analysis/dataset-sheets/ground-truth/python.csv)
│   │   │   └── [typescript.csv](single-language-analysis/dataset-sheets/ground-truth/typescript.csv)
│   │   └── [original-uris/](single-language-analysis/dataset-sheets/original-uris/)                 # Source repository information
│   │       ├── [java-uris.csv](single-language-analysis/dataset-sheets/original-uris/java-uris.csv)
│   │       └── [python-uris.csv](single-language-analysis/dataset-sheets/original-uris/python-uris.csv)
│   │
│   ├── [tool-execution/](single-language-analysis/tool-execution/)                    # Tool outputs and summaries
│   │   ├── [aromalia/](single-language-analysis/tool-execution/aromalia/)                      # AromaLIA tool results
│   │   │   ├── [raw/](single-language-analysis/tool-execution/aromalia/raw/)                       # Raw JSON reports
│   │   │   └── [summary/](single-language-analysis/tool-execution/aromalia/summary/)                   # CSV summaries per language
│   │   ├── [pytest-smell/](single-language-analysis/tool-execution/pytest-smell/)                  # pytest-smell tool results (Python)
│   │   │   ├── [raw/](single-language-analysis/tool-execution/pytest-smell/raw/)
│   │   │   └── [summary/](single-language-analysis/tool-execution/pytest-smell/summary/)
│   │   ├── [tsdetect/](single-language-analysis/tool-execution/tsdetect/)                      # TSDetect tool results (Java)
│   │   │   ├── [input/](single-language-analysis/tool-execution/tsdetect/input/)
│   │   │   ├── [raw/](single-language-analysis/tool-execution/tsdetect/raw/)
│   │   │   └── [summary/](single-language-analysis/tool-execution/tsdetect/summary/)
│   │   └── [xnose/](single-language-analysis/tool-execution/xnose/)                         # xNose tool results (C#)
│   │       ├── [raw/](single-language-analysis/tool-execution/xnose/raw/)
│   │       └── [summary/](single-language-analysis/tool-execution/xnose/summary/)
│   │
│   └── [docs/](single-language-analysis/docs/)                                    # Single-language analysis specific documentation
│       ├── [github-search-queries.txt](single-language-analysis/docs/github-search-queries.txt)  # GitHub queries used for dataset collection
│       └── [prompts/](single-language-analysis/docs/prompts/)                       # Language translation prompts used in analysis
│           ├── [prompt-java-csharp.txt](single-language-analysis/docs/prompts/prompt-java-csharp.txt)
│           ├── [prompt-java-python.txt](single-language-analysis/docs/prompts/prompt-java-python.txt)
│           ├── [prompt-python-csharp.txt](single-language-analysis/docs/prompts/prompt-python-csharp.txt)
│           └── [prompt-python-java.txt](single-language-analysis/docs/prompts/prompt-python-java.txt)
│
├── [multi-language-analysis/](multi-language-analysis/)             # Analysis of projects using multiple languages
│   │                                                               # Based on Apache Beam repository (https://github.com/apache/beam)
│   ├── [analysis/](multi-language-analysis/analysis/)                      # Analysis scripts and results
│   │   ├── [scripts/](multi-language-analysis/analysis/scripts/)                   # Python scripts for visualization
│   │   │   └── [generate_rq4_charts.py](multi-language-analysis/analysis/scripts/generate_rq4_charts.py)  # RQ4: Test smell detection comparison charts
│   │   └── [results/](multi-language-analysis/analysis/results/)                   # Generated charts
│   │       ├── [fig-rq4-overall-comparison-java.pdf](multi-language-analysis/analysis/results/fig-rq4-overall-comparison-java.pdf)
│   │       └── [fig-rq4-overall-comparison-python.pdf](multi-language-analysis/analysis/results/fig-rq4-overall-comparison-python.pdf)
│   │
│   ├── [tool-execution/](multi-language-analysis/tool-execution/)                 # Tool outputs from multi-language projects
│   │   ├── [aromalia/](multi-language-analysis/tool-execution/aromalia/)                   # AromaLIA results for multi-language projects
│   │   ├── [pytest-smell/](multi-language-analysis/tool-execution/pytest-smell/)              # pytest-smell results
│   │   └── [tsdetect/](multi-language-analysis/tool-execution/tsdetect/)                  # TSDetect results
│   │
│   └── [analysis/results/](multi-language-analysis/analysis/results/)                       # Summary data and generated charts
│       ├── [aromalia-java-test-smells.csv](multi-language-analysis/analysis/results/aromalia-java-test-smells.csv)
│       ├── [aromalia-python-test-smells.csv](multi-language-analysis/analysis/results/aromalia-python-test-smells.csv)
│       ├── [pytest-smell-python-test-smells.csv](multi-language-analysis/analysis/results/pytest-smell-python-test-smells.csv)
│       ├── [tsdetect-java-test-smells.csv](multi-language-analysis/analysis/results/tsdetect-java-test-smells.csv)
│       ├── [test-smells-summary.csv](multi-language-analysis/analysis/results/test-smells-summary.csv)
│       ├── [fig-rq4-overall-comparison-java.pdf](multi-language-analysis/analysis/results/fig-rq4-overall-comparison-java.pdf)
│       └── [fig-rq4-overall-comparison-python.pdf](multi-language-analysis/analysis/results/fig-rq4-overall-comparison-python.pdf)
│
└── [docs/](docs/)                                    # General documentation and reference materials
    ├── [test-smell-detection-algorithms.md](docs/test-smell-detection-algorithms.md)
    └── [high-level-test-data-model.ts](docs/high-level-test-data-model.ts)
```

## Dataset

The dataset contains **830 manually validated test smell instances** across five programming languages:

- **C#**: 166 test files
- **Java**: 166 test files
- **Python**: 166 test files
- **JavaScript**: 166 test files
- **TypeScript**: 166 test files

Each instance represents one of **10 types of test smells** that are commonly found in test code. The ground truth classifications are available in the [`single-language-analysis/dataset-sheets/ground-truth/`](single-language-analysis/dataset-sheets/ground-truth/) directory.

### Test Smells Covered

The dataset includes instances of various test smell types:
- Assertion Roulette
- Conditional Test Logic
- Duplicate Assert
- Empty Test
- Exception Handling
- Ignored Test
- Magic Number Test
- Redundant Print
- Sleepy Test
- Unknown Test

## Tools Evaluated

### AromaLIA (Our Approach)
A language-independent test smell detection tool that uses a unified detection mechanism across all five languages.

**Performance**:
- Precision: 0.97
- Recall: 0.96
- F1-Score: 0.97

### Baseline Tools

1. **pytest-smell**: Python-specific test smell detector
2. **TSDetect**: Java-specific test smell detector
3. **xNose**: C#-specific test smell detector

## Requirements

### Software Requirements
- Python 3.10 or higher
- pip package manager

### Python Dependencies

Install all required packages using:

```bash
pip install -r requirements.txt
```

See [`requirements.txt`](requirements.txt) for the complete list of dependencies.

Required packages:
- `pandas>=1.5.0` - Data manipulation and CSV processing
- `numpy>=1.21.0` - Numerical computations and bootstrap confidence intervals
- `matplotlib>=3.5.0` - Chart generation and visualization
- `seaborn>=0.11.0` - Statistical visualization styling
- `scikit-learn>=1.1.0` - Precision, recall, and F1-score metrics

## Setup

1. **Clone the repository**:
```bash
git clone <repository-url>
cd aroma-lia-saner-2026-rp
```

2. **Create a virtual environment** (recommended):
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. **Install dependencies**:
```bash
pip install -r requirements.txt
```

## Reproducing the Results

### Step 1: Calculate Metrics

Run the metric calculation scripts for each tool:

```bash
# Calculate AromaLIA metrics
python single-language-analysis/analysis/scripts/calculate_aromalia_metrics.py

# Calculate baseline tool metrics
python single-language-analysis/analysis/scripts/calculate_pytest_smell_metrics.py
python single-language-analysis/analysis/scripts/calculate_tsdetect_metrics.py
python single-language-analysis/analysis/scripts/calculate_xnose_metrics.py
```

These scripts will generate CSV files in the [`single-language-analysis/analysis/results/`](single-language-analysis/analysis/results/) directory containing precision, recall, and F1-scores for each tool.

### Step 2: Generate Visualizations

Generate charts for each research question:

```bash
# RQ1: How does AromaLIA compare to existing tools?
python single-language-analysis/analysis/scripts/generate_rq1_charts.py

# RQ2: How does AromaLIA perform across different languages?
python single-language-analysis/analysis/scripts/generate_rq2_charts.py

# RQ3: How does AromaLIA perform for different test smell types?
python single-language-analysis/analysis/scripts/generate_rq3_charts.py

# RQ4: How does AromaLIA compare to other tools on multi-language projects?
python multi-language-analysis/analysis/scripts/generate_rq4_charts.py
```

The generated figures will be saved as PDF files:
- Single-language analysis: [`single-language-analysis/analysis/results/`](single-language-analysis/analysis/results/) directory
- Multi-language analysis: [`multi-language-analysis/analysis/results/`](multi-language-analysis/analysis/results/) directory

## Research Questions

### RQ1: Tool Comparison
**How does AromaLIA compare to existing language-specific test smell detection tools?**

AromaLIA outperforms all three baseline tools in terms of precision, recall, and F1-score.

### RQ2: Cross-Language Performance
**How effective is AromaLIA across different programming languages?**

AromaLIA maintains high performance across all five languages, demonstrating true language independence.

### RQ3: Per-Smell Analysis
**How does AromaLIA perform for different types of test smells?**

AromaLIA shows consistent performance across different test smell categories, with varying levels of difficulty for different smell types.

### RQ4: Multi-Language Project Comparison
**How does AromaLIA compare to other tools when analyzing multi-language projects?**

AromaLIA demonstrates its effectiveness on polyglot projects by comparing the amount of test smells detected against language-specific tools (TSDetect for Java and pytest-smell for Python) on the Apache Beam multi-language repository.

## Results

### Single-Language Analysis Results

All evaluation results for single-language projects are available in the [`single-language-analysis/analysis/results/`](single-language-analysis/analysis/results/) directory:

- **Overall metrics**: Global performance across all languages and smells
  - [`aromalia-global-overall-metrics.csv`](single-language-analysis/analysis/results/aromalia-global-overall-metrics.csv)
- **Per-language metrics**: Performance breakdown by programming language
  - [`aromalia-overall-per-language-metrics.csv`](single-language-analysis/analysis/results/aromalia-overall-per-language-metrics.csv)
- **Per-smell metrics**: Performance breakdown by test smell type
  - [`aromalia-per-smell-per-language-metrics.csv`](single-language-analysis/analysis/results/aromalia-per-smell-per-language-metrics.csv)
- **Visualizations**: Bar charts, scatter plots, and heatmaps for comprehensive analysis
  - [`fig-rq1-tools-comparison-bar.pdf`](single-language-analysis/analysis/results/fig-rq1-tools-comparison-bar.pdf)
  - [`fig-rq2-f1-per-language-bar.pdf`](single-language-analysis/analysis/results/fig-rq2-f1-per-language-bar.pdf)
  - [`fig-rq3-f1-per-smell-bar.pdf`](single-language-analysis/analysis/results/fig-rq3-f1-per-smell-bar.pdf)
  - [`fig-rq3-f1-heatmap.pdf`](single-language-analysis/analysis/results/fig-rq3-f1-heatmap.pdf)
  - [`fig-rq3-difficulty-by-category-bar.pdf`](single-language-analysis/analysis/results/fig-rq3-difficulty-by-category-bar.pdf)

### Multi-Language Analysis Results

The multi-language analysis was performed on the [Apache Beam repository](https://github.com/apache/beam), which contains code written in multiple programming languages (primarily Java and Python). Results for multi-language projects are available in the [`multi-language-analysis/analysis/results/`](multi-language-analysis/analysis/results/) directory.

**Visualizations**:
- [`fig-rq4-overall-comparison-java.pdf`](multi-language-analysis/analysis/results/fig-rq4-overall-comparison-java.pdf): Overall comparison of AromaLIA vs TSDetect for Java
- [`fig-rq4-overall-comparison-python.pdf`](multi-language-analysis/analysis/results/fig-rq4-overall-comparison-python.pdf): Overall comparison of AromaLIA vs pytest-smell for Python

See [`multi-language-analysis/README.md`](multi-language-analysis/README.md) for details.

## Data Availability

### Single-Language Analysis Data

- **Test Files**: Available in [`single-language-analysis/dataset-files/`](single-language-analysis/dataset-files/) directory
  - [C# test files](single-language-analysis/dataset-files/CSharp/)
  - [Java test files](single-language-analysis/dataset-files/java/)
  - [JavaScript test files](single-language-analysis/dataset-files/javascript/)
  - [Python test files](single-language-analysis/dataset-files/python/)
  - [TypeScript test files](single-language-analysis/dataset-files/typescript/)
- **Ground Truth**: Available in [`single-language-analysis/dataset-sheets/ground-truth/`](single-language-analysis/dataset-sheets/ground-truth/) directory
  - [C# ground truth](single-language-analysis/dataset-sheets/ground-truth/csharp.csv)
  - [Java ground truth](single-language-analysis/dataset-sheets/ground-truth/java.csv)
  - [JavaScript ground truth](single-language-analysis/dataset-sheets/ground-truth/javascript.csv)
  - [Python ground truth](single-language-analysis/dataset-sheets/ground-truth/python.csv)
  - [TypeScript ground truth](single-language-analysis/dataset-sheets/ground-truth/typescript.csv)
- **Tool Outputs**: Available in [`single-language-analysis/tool-execution/`](single-language-analysis/tool-execution/) directory
  - [AromaLIA results](single-language-analysis/tool-execution/aromalia/)
  - [pytest-smell results](single-language-analysis/tool-execution/pytest-smell/)
  - [TSDetect results](single-language-analysis/tool-execution/tsdetect/)
  - [xNose results](single-language-analysis/tool-execution/xnose/)
- **Analysis-Specific Documentation**: Available in [`single-language-analysis/docs/`](single-language-analysis/docs/) directory
  - [GitHub search queries](single-language-analysis/docs/github-search-queries.txt)
  - [Language translation prompts](single-language-analysis/docs/prompts/)

### Multi-Language Analysis Data

The multi-language analysis was conducted on the [Apache Beam repository](https://github.com/apache/beam), a unified programming model for batch and streaming data processing that contains code in multiple languages (Java, Python, Go, TypeScript, and others).

- **Source Repository**: [Apache Beam](https://github.com/apache/beam)
- **Tool Outputs**: Available in [`multi-language-analysis/tool-execution/`](multi-language-analysis/tool-execution/) directory
- **Results**: Available in [`multi-language-analysis/results/`](multi-language-analysis/results/) directory

### General Documentation

- **Documentation**: Available in [`docs/`](docs/) directory
  - [Test smell detection algorithms documentation](docs/test-smell-detection-algorithms.md)
  - [High-level test data model](docs/high-level-test-data-model.ts)
