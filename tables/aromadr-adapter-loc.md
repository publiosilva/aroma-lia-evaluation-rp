# Structural LOC in AromaDr (commit `a0043c5`)

This table was moved from the manuscript for journal word-limit reasons. Counts are physical lines (`wc -l`), including blank lines and comments. Each language/framework stack comprises a test-file discovery module and an AST-to-model extractor.

| Component | LOC | Notes |
|---|---:|---|
| Java / JUnit adapter | 266 | JUnit 4 and 5 in one adapter |
| C# / xUnit adapter | 206 | |
| Python / pytest adapter | 246 | |
| JavaScript / Jest adapter | 245 | |
| TypeScript / Jest adapter | 247 | Near-duplicate of JS adapter |
| Five evaluation adapters (total) | 1,210 | Discovery + extraction modules |
| Shared detection rules (10 smells) | 311 | Reused for all stacks |
| Shared HLM models + AST helpers | 847 | Reused by every extractor |

AromaDr also includes a Python/unittest adapter (195 LOC) that is outside the evaluation reported in the paper.

These counts characterize code size and reuse in AromaDr; they are not a controlled experiment and do not measure development effort or person-hours.
