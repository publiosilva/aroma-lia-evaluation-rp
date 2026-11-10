export type SmellExample = {
  language: "Java" | "Python";
  caption: string;
  code: string;
};

export const SMELLS = [
  {
    id: "AssertionRoulette",
    label: "Assertion Roulette",
    rule: "A test method contains more than one assertion statement without an explanation or message parameter.",
    note: "Check this when the test has more than one assertion and at least one of them has no message. A single assertion, or several assertions that all include a message, is not this smell.",
    examples: [
      {
        language: "Java",
        caption: "No message",
        code: "assertEquals(expected, actual);\nassertTrue(file.exists());",
      },
      {
        language: "Java",
        caption: "With a message",
        code: "// JUnit 4: message is the first argument\nassertEquals(\"sizes differ\", expected, actual);\n\n// JUnit 5: message is the last argument\nassertEquals(expected, actual, \"sizes differ\");",
      },
      {
        language: "Python",
        caption: "No message",
        code: "assert result == expected\nassert file.is_file()",
      },
      {
        language: "Python",
        caption: "With a message",
        code: "assert result == expected, \"sizes differ\"",
      },
    ],
  },
  {
    id: "ConditionalTestLogic",
    label: "Conditional Test Logic",
    rule: "A test method that contains one or more control statements (e.g., conditional expressions, loops).",
    note: "One if, for, while, or switch inside the test is enough.",
    examples: [
      {
        language: "Java",
        caption: "Condition or loop",
        code: "if (count > 0) {\n    assertEquals(1, count);\n}\nfor (Item item : items) {\n    assertNotNull(item);\n}",
      },
      {
        language: "Python",
        caption: "Condition or loop",
        code: "if count > 0:\n    assert count == 1\nfor item in items:\n    assert item is not None",
      },
    ],
  },
  {
    id: "DuplicateAssert",
    label: "Duplicate Assert",
    rule: "A test method that contains more than one assertion statement with the same parameters.",
    note: "The repeated assertion uses the same values. Two assertions with different expected or actual values are not duplicates.",
    examples: [
      {
        language: "Java",
        caption: "Same parameters",
        code: "assertEquals(0, result);\nassertEquals(0, result);",
      },
      {
        language: "Java",
        caption: "Not a duplicate",
        code: "assertEquals(0, result);\nassertEquals(1, other);",
      },
      {
        language: "Python",
        caption: "Same parameters",
        code: "assert result == 0\nassert result == 0",
      },
      {
        language: "Python",
        caption: "Not a duplicate",
        code: "assert result == 0\nassert other == 1",
      },
    ],
  },
  {
    id: "EmptyTest",
    label: "Empty Test",
    rule: "A test method that does not contain a single executable statement.",
    note: "In Python the body cannot be left blank: that is a syntax error. An empty test is written with pass, which adds no executable statement.",
    examples: [
      {
        language: "Java",
        caption: "Empty body",
        code: "@Test\npublic void empty() {\n}",
      },
      {
        language: "Python",
        caption: "pass stands in for an empty body",
        code: "def test_empty():\n    pass",
      },
    ],
  },
  {
    id: "ExceptionHandling",
    label: "Exception Handling",
    rule: "A test method that contains either a throw statement or a catch clause.",
    note: "A catch, or a throw or raise written in the test, counts. assertThrows and pytest.raises only declare an expected exception, so they are not this smell on their own.",
    examples: [
      {
        language: "Java",
        caption: "catch or throw",
        code: "try {\n    service.run();\n} catch (IOException e) {\n    e.printStackTrace();\n}\nthrow new IllegalStateException(\"failed\");",
      },
      {
        language: "Python",
        caption: "except or raise",
        code: "try:\n    service.run()\nexcept OSError:\n    print(\"failed\")\nraise RuntimeError(\"failed\")",
      },
    ],
  },
  {
    id: "IgnoredTest",
    label: "Ignored Test",
    rule: "A test method or class that is marked to be ignored or disabled during test execution.",
    note: "The test is present but marked so the runner skips it.",
    examples: [
      {
        language: "Java",
        caption: "JUnit 4 and JUnit 5",
        code: "@Ignore\n@Test\npublic void skipped() { }\n\n@Disabled\n@Test\nvoid skipped() { }",
      },
      {
        language: "Python",
        caption: "pytest",
        code: "@pytest.mark.skip(reason=\"not ready\")\ndef test_skipped():\n    pass\n\n@pytest.mark.skipif(condition, reason=\"not ready\")\ndef test_skipped_on_condition():\n    pass",
      },
    ],
  },
  {
    id: "MagicNumberTest",
    label: "Magic Number Test",
    rule: "An assertion statement that contains a numeric literal as an argument.",
    note: "The number is written directly in the assertion. A named constant is not a magic number, and a string literal is not this smell.",
    examples: [
      {
        language: "Java",
        caption: "Numeric literal in the assertion",
        code: "assertEquals(14, locations.size());\nassertEquals(13.1, length, 0.0001);",
      },
      {
        language: "Python",
        caption: "Numeric literal in the assertion",
        code: "assert locations.size() == 14\nassert length == pytest.approx(13.1)",
      },
    ],
  },
  {
    id: "RedundantPrint",
    label: "Redundant Print",
    rule: "A test method that invokes output or logging statements that are not required for test verification.",
    note: "Printing a value to inspect it is this smell. A message passed to an assertion is not a print.",
    examples: [
      {
        language: "Java",
        caption: "Console output",
        code: "System.out.println(result);\nSystem.out.print(result);",
      },
      {
        language: "Python",
        caption: "Console output",
        code: "print(result)",
      },
    ],
  },
  {
    id: "SleepyTest",
    label: "Sleepy Test",
    rule: "A test method that invokes explicit sleep or delay operations.",
    note: "Any call whose purpose is to pause the test counts.",
    examples: [
      {
        language: "Java",
        caption: "Sleep or delay",
        code: "Thread.sleep(1000);\nTimeUnit.SECONDS.sleep(1);",
      },
      {
        language: "Python",
        caption: "Sleep or delay",
        code: "time.sleep(1)",
      },
    ],
  },
  {
    id: "UnknownTest",
    label: "Unknown Test",
    rule: "A test method that does not contain a single assertion statement or any explicit expected outcome specification.",
    note: "Calling the code under test, printing, or sleeping does not state an expected outcome. An empty test, including a Python body that is only pass, also has no assertion, so it is an unknown test as well.",
    examples: [
      {
        language: "Java",
        caption: "No assertion",
        code: "@Test\npublic void savesUser() {\n    service.save(user);\n}",
      },
      {
        language: "Python",
        caption: "No assertion",
        code: "def test_saves_user():\n    service.save(user)",
      },
    ],
  },
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
