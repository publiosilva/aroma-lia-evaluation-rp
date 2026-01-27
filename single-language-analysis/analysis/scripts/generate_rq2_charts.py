#!/usr/bin/env python3
"""
generate_rq2_charts.py

Reads per-language overall metric CSV for AromaLIA and generates:
  1. Bar chart comparing F1-score of AromaLIA for each language.
  2. Scatter plot (Precision vs Recall) comparing AromaLIA performance across languages.

Exports both charts as PDF files.
"""

import os
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

# === CONFIGURATION ===

CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))

METRICS_FILE = os.path.join(CURRENT_DIR, "..", "results", "aromalia-overall-per-language-metrics.csv")

OUTPUT_F1_BAR_CHART = os.path.join(CURRENT_DIR, "..", "results", "fig-rq2-f1-per-language-bar.pdf")

# Matplotlib styling
sns.set_theme(style="whitegrid", font_scale=1.1)


# === FUNCTIONS ===

def load_metrics(file_path):
    """Load per-language overall metric file for AromaLIA."""
    if not os.path.exists(file_path):
        print(f"❌ Metrics file not found: {file_path}")
        return None
    return pd.read_csv(file_path)


def plot_f1_bar_chart(df, output_path):
    """Create bar chart for F1-score of AromaLIA for each language with 95% CI."""
    language_map = {
        "csharp": "C#",
        "java": "Java",
        "python": "Python",
        "javascript": "JavaScript",
        "typescript": "TypeScript"
    }
    df["Language_Formatted"] = df["Language"].map(language_map)
    df = df.sort_values("F1", ascending=False)
    
    plt.figure(figsize=(8, 6))
    
    bars = plt.bar(df["Language_Formatted"], df["F1"],
                   yerr=[df["F1"] - df["F1_CI_Lower"],
                         df["F1_CI_Upper"] - df["F1"]],
                   color=sns.color_palette("Set2", len(df)),
                   capsize=5)

    for i, (bar, value) in enumerate(zip(bars, df["F1"])):
        plt.text(bar.get_x() + bar.get_width() / 2, bar.get_height() + 0.01,
                f'{value:.2f}',
                ha='center', va='bottom', fontsize=10)
    
    plt.ylabel("F1-score")
    plt.xlabel("Programming Language")
    # plt.title("AromaLIA F1-score by Programming Language (95% CI)")
    plt.ylim(0, 1.05)
    plt.tight_layout()
    plt.savefig(output_path, format="pdf")
    plt.close()
    print(f"✅ F1 bar chart saved to: {output_path}")

# === MAIN ===

def main():
    df = load_metrics(METRICS_FILE)
    if df is None or df.empty:
        print("❌ No data found. Please check input file path.")
        return
    
    plot_f1_bar_chart(df, OUTPUT_F1_BAR_CHART)


if __name__ == "__main__":
    main()

