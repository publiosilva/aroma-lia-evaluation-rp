import hljs from "highlight.js/lib/core";
import java from "highlight.js/lib/languages/java";
import python from "highlight.js/lib/languages/python";
import "highlight.js/styles/github.css";

import { downloadCsv, toCsv } from "./export";
import sample from "./sample.json";
import { SMELLS, type SmellId } from "./smells";
import { loadState, saveState, smellMapFromChecks, type LabelState } from "./storage";
import type { SampleFile } from "./types";
import "./styles.css";

hljs.registerLanguage("java", java);
hljs.registerLanguage("python", python);

const files = sample.files as SampleFile[];
const state: LabelState = loadState(files.length);

const checks = new Map<SmellId, HTMLInputElement>();

const app = document.querySelector<HTMLDivElement>("#app");
if (!app) throw new Error("Missing #app");

const progress = el("p", "progress");
const unreviewedNote = el("p", "note");
const jump = document.createElement("select");
jump.id = "jump";
const filenameEl = el("h2", "filename");
const languageEl = el("span", "badge");
const codeEl = document.createElement("code");
const prevButton = el("button", "button", "Previous");
const nextButton = el("button", "button button-primary", "Next");
prevButton.type = "button";
nextButton.type = "button";

let silent = false;

function el<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  className?: string,
  text?: string,
): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function currentFile(): SampleFile {
  return files[state.index];
}

function reviewedCount(): number {
  return files.filter((file) => state.labels[file.filename]).length;
}

function persist(): void {
  saveState(state);
}

function readChecks(): void {
  const file = currentFile();
  state.labels[file.filename] = smellMapFromChecks(
    new Map([...checks].map(([id, input]) => [id, input.checked])),
  );
  persist();
}

function showFile(): void {
  const file = currentFile();
  silent = true;
  filenameEl.textContent = file.filename;
  languageEl.textContent = file.language === "java" ? "Java" : "Python";
  languageEl.dataset.language = file.language;
  codeEl.className = `hljs language-${file.language}`;
  codeEl.innerHTML = hljs.highlight(file.code, { language: file.language }).value;
  codeEl.parentElement?.scrollTo(0, 0);

  const saved = state.labels[file.filename];
  for (const smell of SMELLS) {
    const input = checks.get(smell.id);
    if (input) input.checked = saved ? saved[smell.id] === 1 : false;
  }

  jump.value = String(state.index);
  prevButton.disabled = state.index === 0;
  nextButton.disabled = state.index === files.length - 1;
  silent = false;
  updateStatus();
}

function updateStatus(): void {
  const reviewed = reviewedCount();
  const remaining = files.length - reviewed;
  progress.textContent = `File ${state.index + 1} of ${files.length} · ${reviewed} reviewed`;
  unreviewedNote.textContent =
    remaining === 0
      ? "Every file in the sample has a saved classification."
      : `${remaining} file${remaining === 1 ? "" : "s"} not reviewed yet. They export as all zeros.`;

  for (const option of jump.options) {
    const index = Number(option.value);
    const file = files[index];
    const mark = state.labels[file.filename] ? "●" : "○";
    option.textContent = `${mark} ${index + 1}. ${file.filename}`;
  }
}

function goTo(index: number): void {
  if (index === state.index || index < 0 || index >= files.length) return;
  readChecks();
  state.index = index;
  persist();
  showFile();
}

function build(root: HTMLDivElement): void {
  const header = el("header", "header");
  header.append(
    el("h1", undefined, "Test smell labeling"),
    el(
      "p",
      "lede",
      "Mark which of the 10 test smells are present. The 83 files were chosen once (42 Java, 41 Python) and stay the same between visits. Classifications are saved in this browser.",
    ),
  );

  const statusRow = el("div", "status-row");
  const exportButton = el("button", "button button-primary", "Export CSV");
  exportButton.type = "button";
  exportButton.addEventListener("click", () => {
    readChecks();
    updateStatus();
    downloadCsv(toCsv(files, state.labels), "classification.csv");
  });
  statusRow.append(progress, exportButton);
  header.append(statusRow, unreviewedNote);

  const toolbar = el("div", "toolbar");
  const jumpLabel = el("label", "jump-label", "File");
  jumpLabel.htmlFor = jump.id;
  for (let index = 0; index < files.length; index += 1) {
    const option = document.createElement("option");
    option.value = String(index);
    jump.append(option);
  }
  jump.addEventListener("change", () => {
    if (silent) return;
    goTo(Number(jump.value));
  });
  prevButton.addEventListener("click", () => goTo(state.index - 1));
  nextButton.addEventListener("click", () => goTo(state.index + 1));
  toolbar.append(jumpLabel, jump, prevButton, nextButton);

  const layout = el("div", "layout");
  const codePanel = el("section", "code-panel");
  const codeHeader = el("div", "code-header");
  codeHeader.append(filenameEl, languageEl);
  const pre = document.createElement("pre");
  pre.append(codeEl);
  codePanel.append(codeHeader, pre);

  const smellPanel = el("section", "smell-panel");
  smellPanel.append(
    el("h2", undefined, "Smells present"),
    el("p", "hint", "Check a smell when it exists in this file. Leave it unchecked when it does not."),
  );
  const list = el("ul", "smell-list");
  for (const smell of SMELLS) {
    const item = document.createElement("li");
    const label = document.createElement("label");
    const input = document.createElement("input");
    input.type = "checkbox";
    input.id = `smell-${smell.id}`;
    input.addEventListener("change", () => {
      if (silent) return;
      readChecks();
      updateStatus();
    });
    checks.set(smell.id, input);
    label.append(input, document.createTextNode(smell.label));
    item.append(label);
    list.append(item);
  }
  smellPanel.append(list);

  layout.append(codePanel, smellPanel);
  root.append(header, toolbar, layout);
  showFile();
}

build(app);
