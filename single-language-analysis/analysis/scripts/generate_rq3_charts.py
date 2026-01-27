#!/usr/bin/env python3
"""
generate_rq3_charts.py

Reads per-smell per-language metric CSV for AromaLIA and generates:
  1. Bar chart comparing F1-score of AromaLIA for each test smell.
  2. Bar chart comparing difficulty by smell category.
  3. Heatmap comparing F1-score of AromaLIA for each test smell across languages.

Exports all charts as PDF files.
"""

import os
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

# === CONFIGURATION ===

CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))

METRICS_FILE = os.path.join(CURRENT_DIR, "..", "results", "aromalia-per-smell-per-language-metrics.csv")

OUTPUT_F1_BAR_CHART = os.path.join(CURRENT_DIR, "..", "results", "fig-rq3-f1-per-smell-bar.pdf")
OUTPUT_SMELL_CATEGORY_BAR_CHART = os.path.join(CURRENT_DIR, "..", "results", "fig-rq3-difficulty-by-category-bar.pdf")
OUTPUT_HEATMAP = os.path.join(CURRENT_DIR, "..", "results", "fig-rq3-f1-heatmap.pdf")

# Smell categories
SMELL_CATEGORIES = {
    "AssertionRoulette": "Test semantic - logic",
    "ConditionalTestLogic": "Test semantic - logic",
    "DuplicateAssert": "Code related",
    "EmptyTest": "Code related",
    "IgnoredTest": "Code related",
    "MagicNumberTest": "Code related",
    "RedundantPrint": "Test execution - behavior",
    "SleepyTest": "Test execution - behavior",
    "ExceptionHandling": "Issues in test steps",
    "UnknownTest": "Design related",
}

# Matplotlib styling
sns.set_theme(style="whitegrid", font_scale=1.1)


# === FUNCTIONS ===

def load_metrics(file_path):
    """Load per-smell per-language metric file for AromaLIA."""
    if not os.path.exists(file_path):
        print(f"❌ Metrics file not found: {file_path}")
        return None
    return pd.read_csv(file_path)


def plot_f1_bar_chart(df, output_path):
    """Create bar chart for F1-score of AromaLIA for each test smell (averaged across languages)."""
    test_smell_map = {
        "AssertionRoulette": "Assertion Roulette",
        "ConditionalTestLogic": "Conditional Test Logic",
        "DuplicateAssert": "Duplicate Assert",
        "EmptyTest": "Empty Test",
        "IgnoredTest": "Ignored Test",
        "MagicNumberTest": "Magic Number Test",
        "RedundantPrint": "Redundant Print",
        "SleepyTest": "Sleepy Test",
        "ExceptionHandling": "Exception Handling",
        "UnknownTest": "Unknown Test"
    }
    
    df_f1 = df.groupby("TestSmell")[["F1", "F1_CI_Lower", "F1_CI_Upper"]].mean().reset_index()
    df_f1["TestSmell"] = df_f1["TestSmell"].map(test_smell_map)
    df_f1 = df_f1.sort_values("F1", ascending=True)
    
    plt.figure(figsize=(10, 6))
    
    plt.barh(df_f1["TestSmell"], df_f1["F1"], 
             xerr=[df_f1["F1"] - df_f1["F1_CI_Lower"], 
                   df_f1["F1_CI_Upper"] - df_f1["F1"]],
             color=sns.color_palette("Set2", len(df_f1)),
             capsize=5)
    
    plt.xlabel("F1-score")
    plt.ylabel("Test Smell")
    # plt.title("AromaLIA F1-score by Test Smell (95% CI)")
    plt.xlim(0, 1.05)
    plt.tight_layout()
    plt.savefig(output_path, format="pdf")
    plt.close()
    print(f"✅ F1 bar chart saved to: {output_path}")


def plot_smell_category_bar_chart(df, output_path):
    """Create bar chart for difficulty by category of test smell."""
    df["Category"] = df["TestSmell"].map(SMELL_CATEGORIES)
    df_category = df.groupby("Category")[["F1", "F1_CI_Lower", "F1_CI_Upper"]].mean().reset_index()
    df_category = df_category.sort_values("F1", ascending=True)
    
    plt.figure(figsize=(10, 6))
    
    plt.barh(df_category["Category"], df_category["F1"],
             xerr=[df_category["F1"] - df_category["F1_CI_Lower"],
                   df_category["F1_CI_Upper"] - df_category["F1"]],
             color=sns.color_palette("Set2", len(df_category)),
             capsize=5)
    
    plt.xlabel("F1-score")
    plt.ylabel("Smell Category")
    # plt.title("AromaLIA F1-score by Smell Category (95% CI)")
    plt.xlim(0, 1.05)
    plt.tight_layout()
    plt.savefig(output_path, format="pdf")
    plt.close()
    print(f"✅ Category bar chart saved to: {output_path}")


def plot_heatmap(df, output_path):
    """Create heatmap of F1-score of AromaLIA for each test smell and language."""
    language_map = {
        "csharp": "C#",
        "java": "Java",
        "python": "Python",
        "javascript": "JavaScript",
        "typescript": "TypeScript"
    }
    
    test_smell_map = {
        "AssertionRoulette": "Assertion Roulette",
        "ConditionalTestLogic": "Conditional Test Logic",
        "DuplicateAssert": "Duplicate Assert",
        "EmptyTest": "Empty Test",
        "IgnoredTest": "Ignored Test",
        "MagicNumberTest": "Magic Number Test",
        "RedundantPrint": "Redundant Print",
        "SleepyTest": "Sleepy Test",
        "ExceptionHandling": "Exception Handling",
        "UnknownTest": "Unknown Test"
    }
    
    df_copy = df.copy()
    df_copy["Language"] = df_copy["Language"].map(language_map)
    df_copy["TestSmell"] = df_copy["TestSmell"].map(test_smell_map)
    
    df_pivot = df_copy.pivot(index="TestSmell", columns="Language", values="F1")
    
    plt.figure(figsize=(12, 8))
    sns.heatmap(df_pivot, annot=True, cmap="RdYlGn", fmt=".3f", 
                cbar_kws={'label': 'F1-score'},
                vmin=0.8, vmax=1.0,
                linewidths=0.5)
    
    # plt.title("Heatmap of AromaLIA F1-score by Test Smell and Language")
    plt.xlabel("Programming Language")
    plt.ylabel("Test Smell")
    plt.tight_layout()
    plt.savefig(output_path, format="pdf")
    plt.close()
    print(f"✅ Heatmap saved to: {output_path}")


# === MAIN ===

def main():
    df = load_metrics(METRICS_FILE)
    if df is None or df.empty:
        print("❌ No data found. Please check input file path.")
        return
    
    plot_f1_bar_chart(df, OUTPUT_F1_BAR_CHART)
    plot_smell_category_bar_chart(df, OUTPUT_SMELL_CATEGORY_BAR_CHART)
    plot_heatmap(df, OUTPUT_HEATMAP)


if __name__ == "__main__":
    main()

