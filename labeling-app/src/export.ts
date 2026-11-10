import { SMELLS, emptySmellMap, type SmellMap } from "./smells";
import type { SampleFile } from "./types";

function cell(value: string): string {
  if (/[",\n\r]/.test(value)) return `"${value.replaceAll('"', '""')}"`;
  return value;
}

export function toCsv(files: readonly SampleFile[], labels: Readonly<Record<string, SmellMap>>): string {
  const header = ["filename", ...SMELLS.map((smell) => smell.id)].join(",");
  const rows = files.map((file) => {
    const map = labels[file.filename] ?? emptySmellMap();
    const values = SMELLS.map((smell) => String(map[smell.id]));
    return [cell(file.filename), ...values].join(",");
  });
  return `${header}\n${rows.join("\n")}\n`;
}

export function downloadCsv(csv: string, filename: string): void {
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
