# Decoupling Test Smell Detection from Programming Language: The AromaLIA Approach

## Abstract

Context: Tests play a crucial role in ensuring software quality and reliability; however, test code is frequently affected by test smells that hinder maintainability. Existing detection approaches are predominantly language-specific, which limits their reuse across ecosystems.

Objective: This study proposes AromaLIA, a language-independent approach for detecting test smells by decoupling detection rules, enabling smell detection regardless of the programming language.

Method: We operationalize the approach for ten test smells across C#, Java, Python, JavaScript, and TypeScript, and evaluate it against language-specific baselines using a manually validated dataset of 830 test files.

Results: In this evaluation setting, AromaLIA achieves high effectiveness (precision 97%, recall 96%, F1-score 97%) and outperforms the compared language-specific baselines under directly comparable conditions.

Conclusion: These results demonstrate the effectiveness of AromaLIA as a reusable architectural foundation for cross-language test smell detection, showing that language-independent detection at the rule level can achieve high performance compared to language-specific approaches.

## Repository Structure

This repository contains two parallel analyses evaluating AromaLIA:

1. **Single-Language Analysis**: Evaluation using projects that use a single programming language
2. **Multi-Language Analysis**: Evaluation using projects that use multiple programming languages

```
├── [requirements.txt](requirements.txt)
├── [.gitignore](.gitignore)
├── [single-language-analysis/](single-language-analysis/)
│   ├── [analysis/scripts/](single-language-analysis/analysis/scripts/)
│   │   ├── [base_case_clustering.py](single-language-analysis/analysis/scripts/base_case_clustering.py)           # Shared base-case clustering
│   │   ├── [calculate_aromalia_metrics.py](single-language-analysis/analysis/scripts/calculate_aromalia_metrics.py)
│   │   ├── [calculate_pytest_smell_metrics.py](single-language-analysis/analysis/scripts/calculate_pytest_smell_metrics.py)
│   │   ├── [calculate_tsdetect_metrics.py](single-language-analysis/analysis/scripts/calculate_tsdetect_metrics.py)
│   │   ├── [calculate_xnose_metrics.py](single-language-analysis/analysis/scripts/calculate_xnose_metrics.py)
│   │   ├── [categorize_baseline_errors.py](single-language-analysis/analysis/scripts/categorize_baseline_errors.py)  # Baseline FP/FN causes
│   │   ├── [statistical_tests_rq1_rq3.py](single-language-analysis/analysis/scripts/statistical_tests_rq1_rq3.py)
│   │   ├── [generate_rq1_charts.py](single-language-analysis/analysis/scripts/generate_rq1_charts.py)
│   │   ├── [generate_rq2_charts.py](single-language-analysis/analysis/scripts/generate_rq2_charts.py)
│   │   └── [generate_rq3_charts.py](single-language-analysis/analysis/scripts/generate_rq3_charts.py)
│   ├── [analysis/results/](single-language-analysis/analysis/results/)
│   │   ├── [aromalia-global-overall-metrics.csv](single-language-analysis/analysis/results/aromalia-global-overall-metrics.csv)
│   │   ├── [aromalia-overall-per-language-metrics.csv](single-language-analysis/analysis/results/aromalia-overall-per-language-metrics.csv)
│   │   ├── [aromalia-per-smell-per-language-metrics.csv](single-language-analysis/analysis/results/aromalia-per-smell-per-language-metrics.csv)
│   │   ├── [aromalia-per-smell-aggregated-metrics.csv](single-language-analysis/analysis/results/aromalia-per-smell-aggregated-metrics.csv)
│   │   ├── [aromalia-per-category-aggregated-metrics.csv](single-language-analysis/analysis/results/aromalia-per-category-aggregated-metrics.csv)
│   │   ├── [pytest-smell-overall-metrics.csv](single-language-analysis/analysis/results/pytest-smell-overall-metrics.csv)
│   │   ├── [pytest-smell-per-smell-metrics.csv](single-language-analysis/analysis/results/pytest-smell-per-smell-metrics.csv)
│   │   ├── [tsdetect-overall-metrics.csv](single-language-analysis/analysis/results/tsdetect-overall-metrics.csv)
│   │   ├── [tsdetect-per-smell-metrics.csv](single-language-analysis/analysis/results/tsdetect-per-smell-metrics.csv)
│   │   ├── [xnose-overall-metrics.csv](single-language-analysis/analysis/results/xnose-overall-metrics.csv)
│   │   ├── [xnose-per-smell-metrics.csv](single-language-analysis/analysis/results/xnose-per-smell-metrics.csv)
│   │   ├── [baseline-error-categorization.csv](single-language-analysis/analysis/results/baseline-error-categorization.csv)
│   │   ├── [rq1-statistical-tests.csv](single-language-analysis/analysis/results/rq1-statistical-tests.csv)
│   │   ├── [rq1-statistical-tests-file-level.csv](single-language-analysis/analysis/results/rq1-statistical-tests-file-level.csv)
│   │   ├── [rq1-rq3-long-format-correctness.csv](single-language-analysis/analysis/results/rq1-rq3-long-format-correctness.csv)
│   │   ├── [rq1-rq2-rq3-statistical-interpretation.md](single-language-analysis/analysis/results/rq1-rq2-rq3-statistical-interpretation.md)
│   │   ├── [rq2-rq3-omnibus-tests.csv](single-language-analysis/analysis/results/rq2-rq3-omnibus-tests.csv)
│   │   ├── [rq2-rq3-pairwise-tests.csv](single-language-analysis/analysis/results/rq2-rq3-pairwise-tests.csv)
│   │   ├── [rq2-aromalia-errors-by-language.csv](single-language-analysis/analysis/results/rq2-aromalia-errors-by-language.csv)
│   │   ├── [rq2-aromalia-errors-by-smell.csv](single-language-analysis/analysis/results/rq2-aromalia-errors-by-smell.csv)
│   │   ├── [rq2-origin-split-metrics.csv](single-language-analysis/analysis/results/rq2-origin-split-metrics.csv)
│   │   ├── [fig-rq1-tools-comparison-bar.pdf](single-language-analysis/analysis/results/fig-rq1-tools-comparison-bar.pdf)
│   │   ├── [fig-rq2-f1-per-language-bar.pdf](single-language-analysis/analysis/results/fig-rq2-f1-per-language-bar.pdf)
│   │   ├── [fig-rq3-f1-per-smell-bar.pdf](single-language-analysis/analysis/results/fig-rq3-f1-per-smell-bar.pdf)
│   │   ├── [fig-rq3-f1-heatmap.pdf](single-language-analysis/analysis/results/fig-rq3-f1-heatmap.pdf)
│   │   └── [fig-rq3-difficulty-by-category-bar.pdf](single-language-analysis/analysis/results/fig-rq3-difficulty-by-category-bar.pdf)
│   ├── [dataset-files/](single-language-analysis/dataset-files/)                     # 166 test files per language
│   │   ├── [CSharp/](single-language-analysis/dataset-files/CSharp/)                 # [CSharp.sln](single-language-analysis/dataset-files/CSharp/CSharp.sln), [CSharp.Tests.csproj](single-language-analysis/dataset-files/CSharp/CSharp.Tests/CSharp.Tests.csproj), [summary.csv](single-language-analysis/dataset-files/CSharp/CSharp.Tests/Tests/summary.csv)
│   │   ├── [java/](single-language-analysis/dataset-files/java/)                     # [summary.csv](single-language-analysis/dataset-files/java/summary.csv)
│   │   ├── [javascript/](single-language-analysis/dataset-files/javascript/)         # [summary.csv](single-language-analysis/dataset-files/javascript/summary.csv)
│   │   ├── [python/](single-language-analysis/dataset-files/python/)                 # [summary.csv](single-language-analysis/dataset-files/python/summary.csv)
│   │   └── [typescript/](single-language-analysis/dataset-files/typescript/)         # [summary.csv](single-language-analysis/dataset-files/typescript/summary.csv)
│   ├── [dataset-sheets/](single-language-analysis/dataset-sheets/)
│   │   ├── [ground-truth/](single-language-analysis/dataset-sheets/ground-truth/)    # csharp.csv, java.csv, javascript.csv, python.csv, typescript.csv
│   │   └── [original-uris/](single-language-analysis/dataset-sheets/original-uris/)  # java-uris.csv, python-uris.csv
│   ├── [tool-execution/](single-language-analysis/tool-execution/)
│   │   ├── [aromalia/raw/](single-language-analysis/tool-execution/aromalia/raw/)             # {csharp,java,javascript,python,typescript}-test-smells-report.json
│   │   ├── [aromalia/summary/](single-language-analysis/tool-execution/aromalia/summary/)     # csharp.csv, java.csv, javascript.csv, python.csv, typescript.csv
│   │   ├── [pytest-smell/raw/smells.csv](single-language-analysis/tool-execution/pytest-smell/raw/smells.csv)
│   │   ├── [pytest-smell/summary/pytest-smell-detections.csv](single-language-analysis/tool-execution/pytest-smell/summary/pytest-smell-detections.csv)
│   │   ├── [tsdetect/input/input.csv](single-language-analysis/tool-execution/tsdetect/input/input.csv)
│   │   ├── [tsdetect/raw/](single-language-analysis/tool-execution/tsdetect/raw/)             # Output_TestSmellDetection_1760356376099.csv
│   │   ├── [tsdetect/summary/tsdetect-detections.csv](single-language-analysis/tool-execution/tsdetect/summary/tsdetect-detections.csv)
│   │   ├── [xnose/raw/csharp_test_smell_reports.json](single-language-analysis/tool-execution/xnose/raw/csharp_test_smell_reports.json)
│   │   ├── [xnose/summary/xnose-detections.csv](single-language-analysis/tool-execution/xnose/summary/xnose-detections.csv)
│   │   └── [xnose/summary/xunit-detections.csv](single-language-analysis/tool-execution/xnose/summary/xunit-detections.csv)
│   └── [docs/](single-language-analysis/docs/)
│       ├── [github-search-queries.txt](single-language-analysis/docs/github-search-queries.txt)
│       └── [prompts/](single-language-analysis/docs/prompts/)                       # prompt-java-csharp.txt, prompt-java-python.txt, prompt-python-csharp.txt, prompt-python-java.txt
├── [multi-language-analysis/](multi-language-analysis/)             # Apache Beam (https://github.com/apache/beam)
│   ├── [analysis/scripts/generate_rq4_charts.py](multi-language-analysis/analysis/scripts/generate_rq4_charts.py)
│   ├── [analysis/results/](multi-language-analysis/analysis/results/)
│   │   ├── [aromalia-java-test-smells.csv](multi-language-analysis/analysis/results/aromalia-java-test-smells.csv)
│   │   ├── [aromalia-python-test-smells.csv](multi-language-analysis/analysis/results/aromalia-python-test-smells.csv)
│   │   ├── [pytest-smell-python-test-smells.csv](multi-language-analysis/analysis/results/pytest-smell-python-test-smells.csv)
│   │   ├── [tsdetect-java-test-smells.csv](multi-language-analysis/analysis/results/tsdetect-java-test-smells.csv)
│   │   ├── [test-smells-summary.csv](multi-language-analysis/analysis/results/test-smells-summary.csv)
│   │   ├── [rq4-file-level-disagreement.csv](multi-language-analysis/analysis/results/rq4-file-level-disagreement.csv)
│   │   ├── [fig-rq4-overall-comparison-java.pdf](multi-language-analysis/analysis/results/fig-rq4-overall-comparison-java.pdf)
│   │   ├── [fig-rq4-overall-comparison-python.pdf](multi-language-analysis/analysis/results/fig-rq4-overall-comparison-python.pdf)
│   │   └── [fig-rq4-file-disagreement.pdf](multi-language-analysis/analysis/results/fig-rq4-file-disagreement.pdf)
│   └── [tool-execution/](multi-language-analysis/tool-execution/)
│       ├── [aromalia/beam-java-test-smells-simplified.json](multi-language-analysis/tool-execution/aromalia/beam-java-test-smells-simplified.json)
│       ├── [aromalia/beam-python-test-smells-simplified.json](multi-language-analysis/tool-execution/aromalia/beam-python-test-smells-simplified.json)
│       ├── [pytest-smell/smells.csv](multi-language-analysis/tool-execution/pytest-smell/smells.csv)
│       └── [tsdetect/output.csv](multi-language-analysis/tool-execution/tsdetect/output.csv)
└── [docs/](docs/)
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
- `statsmodels>=0.14.0` - Bayesian variational binomial mixed GLM (`BinomialBayesMixedGLM`)

Bootstrap confidence intervals resample the **166 base cases** with replacement (not individual file×smell cells). The mixed model uses a random intercept for each `base_case_id`, shared across the five language variants.

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

# Categorize baseline false positives and false negatives
python single-language-analysis/analysis/scripts/categorize_baseline_errors.py
```

These scripts write precision, recall, and F1 CSVs to [`single-language-analysis/analysis/results/`](single-language-analysis/analysis/results/). `calculate_aromalia_metrics.py` also writes [`aromalia-per-smell-aggregated-metrics.csv`](single-language-analysis/analysis/results/aromalia-per-smell-aggregated-metrics.csv) and [`aromalia-per-category-aggregated-metrics.csv`](single-language-analysis/analysis/results/aromalia-per-category-aggregated-metrics.csv). `categorize_baseline_errors.py` writes [`baseline-error-categorization.csv`](single-language-analysis/analysis/results/baseline-error-categorization.csv).

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

### Step 3: Run Statistical Significance Tests (RQ1-RQ3)

```bash
python single-language-analysis/analysis/scripts/statistical_tests_rq1_rq3.py
```

This script generates the inferential analysis artifacts in [`single-language-analysis/analysis/results/`](single-language-analysis/analysis/results/):
- [`rq1-statistical-tests.csv`](single-language-analysis/analysis/results/rq1-statistical-tests.csv): McNemar exact tests on (file, smell) cells for AromaLIA vs each baseline tool
- [`rq1-statistical-tests-file-level.csv`](single-language-analysis/analysis/results/rq1-statistical-tests-file-level.csv): file-level McNemar sensitivity (more correct smells wins)
- [`rq2-rq3-omnibus-tests.csv`](single-language-analysis/analysis/results/rq2-rq3-omnibus-tests.csv): omnibus tests from the base-case–clustered Bayesian variational mixed GLM
- [`rq2-rq3-pairwise-tests.csv`](single-language-analysis/analysis/results/rq2-rq3-pairwise-tests.csv): Holm-corrected pairwise contrasts with odds ratios
- [`rq1-rq2-rq3-statistical-interpretation.md`](single-language-analysis/analysis/results/rq1-rq2-rq3-statistical-interpretation.md): plain-language interpretation
- [`rq1-rq3-long-format-correctness.csv`](single-language-analysis/analysis/results/rq1-rq3-long-format-correctness.csv): per-cell correctness table used by the tests

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
  - [`aromalia-per-smell-aggregated-metrics.csv`](single-language-analysis/analysis/results/aromalia-per-smell-aggregated-metrics.csv)
  - [`aromalia-per-category-aggregated-metrics.csv`](single-language-analysis/analysis/results/aromalia-per-category-aggregated-metrics.csv)
- **Baseline metrics**: Overall and per-smell scores for pytest-smell, TSDetect, and xNose
  - [`pytest-smell-overall-metrics.csv`](single-language-analysis/analysis/results/pytest-smell-overall-metrics.csv), [`pytest-smell-per-smell-metrics.csv`](single-language-analysis/analysis/results/pytest-smell-per-smell-metrics.csv)
  - [`tsdetect-overall-metrics.csv`](single-language-analysis/analysis/results/tsdetect-overall-metrics.csv), [`tsdetect-per-smell-metrics.csv`](single-language-analysis/analysis/results/tsdetect-per-smell-metrics.csv)
  - [`xnose-overall-metrics.csv`](single-language-analysis/analysis/results/xnose-overall-metrics.csv), [`xnose-per-smell-metrics.csv`](single-language-analysis/analysis/results/xnose-per-smell-metrics.csv)
- **Errors and origin split**: [`baseline-error-categorization.csv`](single-language-analysis/analysis/results/baseline-error-categorization.csv), [`rq2-aromalia-errors-by-language.csv`](single-language-analysis/analysis/results/rq2-aromalia-errors-by-language.csv), [`rq2-aromalia-errors-by-smell.csv`](single-language-analysis/analysis/results/rq2-aromalia-errors-by-smell.csv), [`rq2-origin-split-metrics.csv`](single-language-analysis/analysis/results/rq2-origin-split-metrics.csv)
- **Statistical tests**: listed under [Step 3](#step-3-run-statistical-significance-tests-rq1-rq3)
- **Visualizations**:
  - [`fig-rq1-tools-comparison-bar.pdf`](single-language-analysis/analysis/results/fig-rq1-tools-comparison-bar.pdf)
  - [`fig-rq2-f1-per-language-bar.pdf`](single-language-analysis/analysis/results/fig-rq2-f1-per-language-bar.pdf)
  - [`fig-rq3-f1-per-smell-bar.pdf`](single-language-analysis/analysis/results/fig-rq3-f1-per-smell-bar.pdf)
  - [`fig-rq3-f1-heatmap.pdf`](single-language-analysis/analysis/results/fig-rq3-f1-heatmap.pdf)
  - [`fig-rq3-difficulty-by-category-bar.pdf`](single-language-analysis/analysis/results/fig-rq3-difficulty-by-category-bar.pdf)

### Multi-Language Analysis Results

The multi-language analysis was performed on the [Apache Beam repository](https://github.com/apache/beam), which contains code written in multiple programming languages (primarily Java and Python). Results for multi-language projects are available in the [`multi-language-analysis/analysis/results/`](multi-language-analysis/analysis/results/) directory.

- [`aromalia-java-test-smells.csv`](multi-language-analysis/analysis/results/aromalia-java-test-smells.csv), [`aromalia-python-test-smells.csv`](multi-language-analysis/analysis/results/aromalia-python-test-smells.csv), [`tsdetect-java-test-smells.csv`](multi-language-analysis/analysis/results/tsdetect-java-test-smells.csv), [`pytest-smell-python-test-smells.csv`](multi-language-analysis/analysis/results/pytest-smell-python-test-smells.csv), [`test-smells-summary.csv`](multi-language-analysis/analysis/results/test-smells-summary.csv)
- [`rq4-file-level-disagreement.csv`](multi-language-analysis/analysis/results/rq4-file-level-disagreement.csv), [`fig-rq4-file-disagreement.pdf`](multi-language-analysis/analysis/results/fig-rq4-file-disagreement.pdf): files detected by only one tool
- [`fig-rq4-overall-comparison-java.pdf`](multi-language-analysis/analysis/results/fig-rq4-overall-comparison-java.pdf): AromaLIA vs TSDetect
- [`fig-rq4-overall-comparison-python.pdf`](multi-language-analysis/analysis/results/fig-rq4-overall-comparison-python.pdf): AromaLIA vs pytest-smell

## Data Availability

### Single-Language Analysis Data

- **Test Files**: Available in [`single-language-analysis/dataset-files/`](single-language-analysis/dataset-files/) directory
  - [C# test files](single-language-analysis/dataset-files/CSharp/)
  - [Java test files](single-language-analysis/dataset-files/java/)
  - [JavaScript test files](single-language-analysis/dataset-files/javascript/)
  - [Python test files](single-language-analysis/dataset-files/python/)
  - [TypeScript test files](single-language-analysis/dataset-files/typescript/)
- **Source URLs**: `summary.csv` in each language folder (C#: [`CSharp.Tests/Tests/summary.csv`](single-language-analysis/dataset-files/CSharp/CSharp.Tests/Tests/summary.csv)). C# also includes [`CSharp.sln`](single-language-analysis/dataset-files/CSharp/CSharp.sln) and [`CSharp.Tests.csproj`](single-language-analysis/dataset-files/CSharp/CSharp.Tests/CSharp.Tests.csproj). Java and Python repository lists: [`java-uris.csv`](single-language-analysis/dataset-sheets/original-uris/java-uris.csv), [`python-uris.csv`](single-language-analysis/dataset-sheets/original-uris/python-uris.csv)
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
- **Results**: Available in [`multi-language-analysis/analysis/results/`](multi-language-analysis/analysis/results/)

### General Documentation

- **Documentation**: Available in [`docs/`](docs/) directory
  - [Test smell detection algorithms documentation](docs/test-smell-detection-algorithms.md)
  - [High-level test data model](docs/high-level-test-data-model.ts)
