import { SMELLS, emptySmellMap, type SmellId, type SmellMap } from "./smells";

export const STORAGE_KEY = "aroma-lia-labeling-v1";

export type LabelState = {
  index: number;
  labels: Record<string, SmellMap>;
};

function isSmellMap(value: unknown): value is SmellMap {
  if (!value || typeof value !== "object") return false;
  const record = value as Record<string, unknown>;
  return SMELLS.every((smell) => record[smell.id] === 0 || record[smell.id] === 1);
}

export function loadState(fileCount: number): LabelState {
  const fallback: LabelState = { index: 0, labels: {} };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw) as Partial<LabelState>;
    const labels: Record<string, SmellMap> = {};
    if (parsed.labels && typeof parsed.labels === "object") {
      for (const [filename, value] of Object.entries(parsed.labels)) {
        if (isSmellMap(value)) labels[filename] = value;
      }
    }
    const index = typeof parsed.index === "number" && Number.isInteger(parsed.index) ? parsed.index : 0;
    return {
      index: Math.min(Math.max(index, 0), Math.max(fileCount - 1, 0)),
      labels,
    };
  } catch {
    return fallback;
  }
}

export function saveState(state: LabelState): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function smellMapFromChecks(checked: ReadonlyMap<SmellId, boolean>): SmellMap {
  const map = emptySmellMap();
  for (const smell of SMELLS) {
    map[smell.id] = checked.get(smell.id) ? 1 : 0;
  }
  return map;
}
