# Statistical Interpretation for RQ1-RQ3

Clustering unit: `base_case_id` (166 curated cases). Mixed model: `BinomialBayesMixedGLM.fit_vb` with random intercept per base case (not per `language::filename`). Bootstrap CIs elsewhere resample the same 166 base cases. Source-project nesting is not fitted (73/105 projects are singletons).

## RQ1 - AromaLIA vs language-specific tools (file x smell cells)
- AromaLIA vs xNose (csharp): statistically significant after Holm correction (p=9.905e-25), discordant advantage=0.9388 (favors AromaLIA).
- AromaLIA vs TSDetect (java): statistically significant after Holm correction (p=1.032e-42), discordant advantage=0.9058 (favors AromaLIA).
- AromaLIA vs pytest-smell (python): statistically significant after Holm correction (p=5.26e-88), discordant advantage=0.9486 (favors AromaLIA).

## RQ1 sensitivity - file-level majority (more correct smells wins)
- AromaLIA vs xNose (csharp): statistically significant after Holm correction (b=75, c=2, ties=89, p=3.976e-20).
- AromaLIA vs TSDetect (java): statistically significant after Holm correction (b=120, c=6, ties=40, p=2.435e-28).
- AromaLIA vs pytest-smell (python): statistically significant after Holm correction (b=150, c=2, ties=14, p=1.222e-41).

## RQ2 and RQ3 - AromaLIA across languages and smells
- Omnibus effect of language: not statistically significant (p=0.3202).
- Omnibus effect of smell: statistically significant (p=9.497e-10).

### Significant pairwise contrasts (Holm-adjusted)
- smell: MagicNumberTest vs SleepyTest (OR=0.052, 95% CI [0.012, 0.216], p=0.002188).
- smell: EmptyTest vs MagicNumberTest (OR=40.563, 95% CI [6.741, 244.084], p=0.002312).
- smell: IgnoredTest vs MagicNumberTest (OR=165.985, 95% CI [13.372, 2060.298], p=0.002989).
- smell: ConditionalTestLogic vs IgnoredTest (OR=0.008, 95% CI [0.001, 0.097], p=0.006781).
- smell: ConditionalTestLogic vs EmptyTest (OR=0.032, 95% CI [0.005, 0.192], p=0.007252).
- smell: MagicNumberTest vs RedundantPrint (OR=0.150, 95% CI [0.055, 0.406], p=0.007533).
- smell: ConditionalTestLogic vs SleepyTest (OR=0.066, 95% CI [0.016, 0.281], p=0.008871).
- smell: DuplicateAssert vs IgnoredTest (OR=0.010, 95% CI [0.001, 0.125], p=0.01353).
- smell: AssertionRoulette vs IgnoredTest (OR=0.012, 95% CI [0.001, 0.147], p=0.01912).
- smell: DuplicateAssert vs EmptyTest (OR=0.040, 95% CI [0.007, 0.249], p=0.01939).
- smell: AssertionRoulette vs MagicNumberTest (OR=2.036, 95% CI [1.346, 3.079], p=0.02663).
- smell: AssertionRoulette vs EmptyTest (OR=0.050, 95% CI [0.009, 0.288], p=0.02668).
- smell: DuplicateAssert vs SleepyTest (OR=0.085, 95% CI [0.020, 0.364], p=0.02989).
- smell: ExceptionHandling vs MagicNumberTest (OR=5.181, 95% CI [1.921, 13.976], p=0.037).
- smell: IgnoredTest vs UnknownTest (OR=67.984, 95% CI [5.284, 874.703], p=0.03742).
- smell: AssertionRoulette vs SleepyTest (OR=0.105, 95% CI [0.027, 0.414], p=0.03779).
- smell: ConditionalTestLogic vs RedundantPrint (OR=0.192, 95% CI [0.070, 0.531], p=0.04211).
