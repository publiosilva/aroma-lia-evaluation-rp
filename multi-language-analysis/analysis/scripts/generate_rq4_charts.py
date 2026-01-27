#!/usr/bin/env python3
"""
generate_rq4_charts.py

Reads test-smells-summary.csv and generates:
  Overall comparison charts: Separate charts for Java and Python

Exports charts as PDF files.
"""

import os
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np

# === CONFIGURATION ===

CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))

# Input file
SUMMARY_FILE = os.path.join(CURRENT_DIR, "..", "results", "test-smells-summary.csv")

# Output chart paths
OUTPUT_OVERALL_JAVA_CHART = os.path.join(CURRENT_DIR, "..", "results", "fig-rq4-overall-comparison-java.pdf")
OUTPUT_OVERALL_PYTHON_CHART = os.path.join(CURRENT_DIR, "..", "results", "fig-rq4-overall-comparison-python.pdf")

# Tool mappings
JAVA_TOOLS = {
    "aromadr": "aromadr-java",
    "other": "tsdetect-java"
}

PYTHON_TOOLS = {
    "aromadr": "aromadr-python",
    "other": "pytest-smell"
}

# Consistent color palette across all charts
COLOR_PALETTE = sns.color_palette("Set2", 4)
AROMALIA_COLOR = COLOR_PALETTE[0]  # Same color for AromaLIA in all charts
TSDETECT_COLOR = COLOR_PALETTE[1]  # TSDetect color
PYTEST_SMELL_COLOR = COLOR_PALETTE[2]  # pytest-smell color

# Matplotlib styling
sns.set_theme(style="whitegrid", font_scale=1.1)


# === FUNCTIONS ===

def load_summary_data():
    """Load test-smells-summary.csv file."""
    if not os.path.exists(SUMMARY_FILE):
        raise FileNotFoundError(f"Summary file not found: {SUMMARY_FILE}")
    df = pd.read_csv(SUMMARY_FILE)
    return df


def get_tool_data(df, tool_name):
    """Extract data for a specific tool."""
    tool_row = df[df["Tool"] == tool_name]
    if tool_row.empty:
        raise ValueError(f"Tool '{tool_name}' not found in summary data")
    return tool_row.iloc[0]


def plot_overall_java_comparison(df, output_path):
    """Create overall comparison chart for Java tools."""
    # Extract data for Java tools
    aromadr_java = get_tool_data(df, JAVA_TOOLS["aromadr"])
    tsdetect_java = get_tool_data(df, JAVA_TOOLS["other"])
    
    # Create figure
    fig, ax = plt.subplots(figsize=(6, 6))
    
    # Set up bar positions
    tools = ["AromaLIA", "TSDetect"]
    values = [aromadr_java["Overall"], tsdetect_java["Overall"]]
    x = np.arange(len(tools))
    bar_width = 0.6
    
    # Use consistent colors
    colors = [AROMALIA_COLOR, TSDETECT_COLOR]
    
    # Plot bars
    bars = ax.bar(x, values, bar_width, color=colors, alpha=0.8)
    
    # Add value labels on bars
    for bar in bars:
        height = bar.get_height()
        ax.text(bar.get_x() + bar.get_width()/2., height,
               f'{int(height):,}',
               ha='center', va='bottom', fontsize=10)
    
    # Customize chart
    ax.set_xlabel("Tool", fontsize=12)
    ax.set_ylabel("Number of Test Smells Detected", fontsize=12)
    ax.set_title("RQ4: Overall Test Smell Detection Comparison (Java)", fontsize=14, fontweight='bold')
    ax.set_xticks(x)
    ax.set_xticklabels(tools)
    ax.grid(axis='y', alpha=0.3)
    
    plt.tight_layout()
    plt.savefig(output_path, format="pdf")
    plt.close()
    print(f"✅ Overall Java comparison chart saved to: {output_path}")


def plot_overall_python_comparison(df, output_path):
    """Create overall comparison chart for Python tools."""
    # Extract data for Python tools
    aromadr_python = get_tool_data(df, PYTHON_TOOLS["aromadr"])
    pytest_smell = get_tool_data(df, PYTHON_TOOLS["other"])
    
    # Create figure
    fig, ax = plt.subplots(figsize=(6, 6))
    
    # Set up bar positions
    tools = ["AromaLIA", "pytest-smell"]
    values = [aromadr_python["Overall"], pytest_smell["Overall"]]
    x = np.arange(len(tools))
    bar_width = 0.6
    
    # Use consistent colors (same AromaLIA color as Java chart)
    colors = [AROMALIA_COLOR, PYTEST_SMELL_COLOR]
    
    # Plot bars
    bars = ax.bar(x, values, bar_width, color=colors, alpha=0.8)
    
    # Add value labels on bars
    for bar in bars:
        height = bar.get_height()
        ax.text(bar.get_x() + bar.get_width()/2., height,
               f'{int(height):,}',
               ha='center', va='bottom', fontsize=10)
    
    # Customize chart
    ax.set_xlabel("Tool", fontsize=12)
    ax.set_ylabel("Number of Test Smells Detected", fontsize=12)
    ax.set_title("RQ4: Overall Test Smell Detection Comparison (Python)", fontsize=14, fontweight='bold')
    ax.set_xticks(x)
    ax.set_xticklabels(tools)
    ax.grid(axis='y', alpha=0.3)
    
    plt.tight_layout()
    plt.savefig(output_path, format="pdf")
    plt.close()
    print(f"✅ Overall Python comparison chart saved to: {output_path}")


# === MAIN ===

def main():
    try:
        df = load_summary_data()
        print(f"✅ Loaded summary data from: {SUMMARY_FILE}")
    except FileNotFoundError as e:
        print(f"❌ {e}")
        return
    
    # Generate overall comparison charts
    try:
        plot_overall_java_comparison(df, OUTPUT_OVERALL_JAVA_CHART)
    except Exception as e:
        print(f"❌ Error generating overall Java comparison chart: {e}")
        return
    
    try:
        plot_overall_python_comparison(df, OUTPUT_OVERALL_PYTHON_CHART)
    except Exception as e:
        print(f"❌ Error generating overall Python comparison chart: {e}")
        return
    
    print("\n✅ All RQ4 charts generated successfully!")


if __name__ == "__main__":
    main()
