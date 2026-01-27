#!/usr/bin/env python3
"""
generate_rq1_charts.py

Reads overall metric CSVs for multiple tools and generates:
  Bar chart comparing each tool against AromaLIA (F1) with 95% CI.

Exports chart as PDF file.
"""

import os
import pandas as pd
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
import seaborn as sns

# === CONFIGURATION ===

CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))

# AromaLIA baseline
AROMALIA_FILE = os.path.join(CURRENT_DIR, "..", "results", "aromalia-global-overall-metrics.csv")

# Other tools to compare against AromaLIA
OTHER_TOOLS = ["xNose", "TSDETECT", "PyTest-Smell"]
OTHER_TOOL_FILES = [
    os.path.join(CURRENT_DIR, "..", "results", "xnose-overall-metrics.csv"),
    os.path.join(CURRENT_DIR, "..", "results", "tsdetect-overall-metrics.csv"),
    os.path.join(CURRENT_DIR, "..", "results", "pytest-smell-overall-metrics.csv"),
]

# Map tools to their corresponding languages for AromaLIA comparison
TOOL_TO_LANGUAGE = {
    "xNose": "C#",
    "TSDETECT": "Java",
    "PyTest-Smell": "Python"
}

# Output chart path
OUTPUT_BAR_CHART = os.path.join(CURRENT_DIR, "..", "results", "fig-rq1-tools-comparison-bar.pdf")

# Matplotlib styling
sns.set_theme(style="whitegrid", font_scale=1.1)


# === FUNCTIONS ===

def load_aromalia_metrics():
    """Load AromaLIA metrics as baseline."""
    if not os.path.exists(AROMALIA_FILE):
        raise FileNotFoundError(f"AromaLIA metrics file not found: {AROMALIA_FILE}")
    df = pd.read_csv(AROMALIA_FILE)
    return df.iloc[0]  # Return first row as Series


def load_other_tool_metrics():
    """Load metrics for other tools."""
    data = []
    for tool, file_path in zip(OTHER_TOOLS, OTHER_TOOL_FILES):
        if not os.path.exists(file_path):
            print(f"⚠️ Skipping {tool}: file not found → {file_path}")
            continue
        df = pd.read_csv(file_path)
        df["Tool"] = tool
        data.append(df)
    if not data:
        return pd.DataFrame()
    combined = pd.concat(data, ignore_index=True)
    return combined


def plot_bar_chart(aromalia_row, other_tools_df, output_path):
    """Create bar chart comparing each tool against AromaLIA (F1 only) with 95% CI."""
    if other_tools_df.empty:
        print("❌ No other tools data found.")
        return

    metric = "F1"
    ci_lower = "F1_CI_Lower"
    ci_upper = "F1_CI_Upper"

    plt.figure(figsize=(8, 6))
    
    # Number of tools to compare (excluding AromaLIA)
    num_tools = len(other_tools_df)
    
    # Color palette - use Set2 like other scripts
    color_palette = sns.color_palette("Set2", max(num_tools + 1, 8))
    aromalia_color = color_palette[0]  # First color for AromaLIA
    tool_colors = color_palette[1:num_tools + 1]  # Different colors for each tool
    
    # Different hatch patterns for each AromaLIA bar
    hatch_patterns = ['///', '\\\\', '|||', '---', '+++', 'xxx', '...', 'ooo']
    
    # Calculate bar positions
    bar_width = 0.35
    group_width = bar_width * 2  # AromaLIA + other tool
    
    # Draw bars for each tool comparison
    for tool_idx, (_, tool_row) in enumerate(other_tools_df.iterrows()):
        base_x = tool_idx * (group_width + 0.5)
        
        # AromaLIA bar (left side, hatched pattern)
        aromalia_x = base_x
        aromalia_value = aromalia_row[metric]
        aromalia_yerr_lower = aromalia_value - aromalia_row[ci_lower]
        aromalia_yerr_upper = aromalia_row[ci_upper] - aromalia_value
        
        plt.bar(
            aromalia_x,
            aromalia_value,
            width=bar_width,
            color=aromalia_color,
            alpha=0.7,
            hatch=hatch_patterns[tool_idx % len(hatch_patterns)],
            yerr=[[aromalia_yerr_lower], [aromalia_yerr_upper]],
            capsize=5
        )
        
        # Other tool bar (right side) - different color for each tool
        tool_x = base_x + bar_width
        tool_value = tool_row[metric]
        tool_yerr_lower = tool_value - tool_row[ci_lower]
        tool_yerr_upper = tool_row[ci_upper] - tool_value
        
        plt.bar(
            tool_x,
            tool_value,
            width=bar_width,
            color=tool_colors[tool_idx],
            yerr=[[tool_yerr_lower], [tool_yerr_upper]],
            capsize=5
        )
    
    # Set x-axis ticks without labels
    tick_positions = []
    for tool_idx in range(num_tools):
        base_x = tool_idx * (group_width + 0.5)
        tick_positions.append(base_x + bar_width)
    
    plt.xticks(tick_positions, [""] * num_tools)  # Empty labels
    plt.ylabel("F1 Score")
    plt.ylim(0, 1.05)
    
    # Create custom legend with hatch patterns for each AromaLIA language
    legend_handles = []
    # Add AromaLIA entries with different hatch patterns for each language
    for tool_idx, (_, tool_row) in enumerate(other_tools_df.iterrows()):
        tool_name = tool_row["Tool"]
        language = TOOL_TO_LANGUAGE.get(tool_name, "")
        aromalia_label = f"AromaLIA {language}"
        aromalia_patch = mpatches.Patch(
            facecolor=aromalia_color,
            alpha=0.7,
            hatch=hatch_patterns[tool_idx % len(hatch_patterns)],
            label=aromalia_label
        )
        legend_handles.append(aromalia_patch)
    # Add other tools
    for tool_idx, (_, tool_row) in enumerate(other_tools_df.iterrows()):
        tool_patch = mpatches.Patch(
            facecolor=tool_colors[tool_idx],
            label=tool_row["Tool"]
        )
        legend_handles.append(tool_patch)
    
    plt.legend(handles=legend_handles, loc='best')
    plt.tight_layout()
    plt.savefig(output_path, format="pdf")
    plt.close()
    print(f"✅ Bar chart saved to: {output_path}")


# === MAIN ===

def main():
    try:
        aromalia_row = load_aromalia_metrics()
    except FileNotFoundError as e:
        print(f"❌ {e}")
        return
    
    other_tools_df = load_other_tool_metrics()
    if other_tools_df.empty:
        print("❌ No other tools data found. Please check input file paths.")
        return

    plot_bar_chart(aromalia_row, other_tools_df, OUTPUT_BAR_CHART)


if __name__ == "__main__":
    main()
