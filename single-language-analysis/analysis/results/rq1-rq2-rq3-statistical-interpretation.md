# Statistical Interpretation for RQ1-RQ3

## RQ1 - AromaLIA vs language-specific tools
- AromaLIA vs xNose (csharp): statistically significant after Holm correction (p=9.905e-25), discordant advantage=0.9388 (favors AromaLIA).
- AromaLIA vs TSDetect (java): statistically significant after Holm correction (p=1.032e-42), discordant advantage=0.9058 (favors AromaLIA).
- AromaLIA vs pytest-smell (python): statistically significant after Holm correction (p=5.26e-88), discordant advantage=0.9486 (favors AromaLIA).

## RQ2 and RQ3 - AromaLIA across languages and smells
- Omnibus effect of language: not statistically significant (p=0.4232).
- Omnibus effect of smell: statistically significant (p=7.206e-10).

### Significant pairwise contrasts (Holm-adjusted)
- smell: MagicNumberTest vs SleepyTest (OR=0.051, 95% CI [0.012, 0.212], p=0.001998).
- smell: EmptyTest vs MagicNumberTest (OR=41.560, 95% CI [6.892, 250.602], p=0.002106).
- smell: IgnoredTest vs MagicNumberTest (OR=169.483, 95% CI [13.681, 2099.621], p=0.002755).
- smell: ConditionalTestLogic vs IgnoredTest (OR=0.008, 95% CI [0.001, 0.095], p=0.00632).
- smell: ConditionalTestLogic vs EmptyTest (OR=0.031, 95% CI [0.005, 0.189], p=0.006703).
- smell: MagicNumberTest vs RedundantPrint (OR=0.147, 95% CI [0.054, 0.401], p=0.007057).
- smell: ConditionalTestLogic vs SleepyTest (OR=0.065, 95% CI [0.015, 0.276], p=0.008231).
- smell: DuplicateAssert vs IgnoredTest (OR=0.010, 95% CI [0.001, 0.122], p=0.01276).
- smell: DuplicateAssert vs EmptyTest (OR=0.040, 95% CI [0.006, 0.244], p=0.01834).
- smell: AssertionRoulette vs IgnoredTest (OR=0.012, 95% CI [0.001, 0.145], p=0.01834).
- smell: AssertionRoulette vs MagicNumberTest (OR=2.058, 95% CI [1.358, 3.118], p=0.02335).
- smell: AssertionRoulette vs EmptyTest (OR=0.050, 95% CI [0.009, 0.284], p=0.02556).
- smell: DuplicateAssert vs SleepyTest (OR=0.083, 95% CI [0.019, 0.359], p=0.02819).
- smell: ExceptionHandling vs MagicNumberTest (OR=5.274, 95% CI [1.944, 14.312], p=0.03503).
- smell: IgnoredTest vs UnknownTest (OR=68.842, 95% CI [5.357, 884.644], p=0.03598).
- smell: AssertionRoulette vs SleepyTest (OR=0.104, 95% CI [0.026, 0.410], p=0.03648).
- smell: ConditionalTestLogic vs RedundantPrint (OR=0.189, 95% CI [0.068, 0.525], p=0.04003).
