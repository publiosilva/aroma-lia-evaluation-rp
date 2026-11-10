export const SMELLS = [
  { id: "AssertionRoulette", label: "Assertion Roulette" },
  { id: "ConditionalTestLogic", label: "Conditional Test Logic" },
  { id: "DuplicateAssert", label: "Duplicate Assert" },
  { id: "EmptyTest", label: "Empty Test" },
  { id: "ExceptionHandling", label: "Exception Handling" },
  { id: "IgnoredTest", label: "Ignored Test" },
  { id: "MagicNumberTest", label: "Magic Number Test" },
  { id: "RedundantPrint", label: "Redundant Print" },
  { id: "SleepyTest", label: "Sleepy Test" },
  { id: "UnknownTest", label: "Unknown Test" },
] as const;

export type SmellId = (typeof SMELLS)[number]["id"];

export type SmellMap = Record<SmellId, 0 | 1>;

export function emptySmellMap(): SmellMap {
  return {
    AssertionRoulette: 0,
    ConditionalTestLogic: 0,
    DuplicateAssert: 0,
    EmptyTest: 0,
    ExceptionHandling: 0,
    IgnoredTest: 0,
    MagicNumberTest: 0,
    RedundantPrint: 0,
    SleepyTest: 0,
    UnknownTest: 0,
  };
}
