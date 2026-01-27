# Test Smell Detection Algorithms

---

## 1. Assertion Roulette Detection

**Function:** `DetectAssertionRoulette(test)`

1. Set `hasMoreThanOneAssert` ← length of `test.asserts` > 1
2. Set `hasSomeAssertWithoutMessage` ← False
3. For each `assert` in `test.asserts`:
   - If `assert.message` is empty:
     - Set `hasSomeAssertWithoutMessage` ← True
     - Break
4. Return `hasMoreThanOneAssert` **AND** `hasSomeAssertWithoutMessage`

---

## 2. Conditional Test Logic Detection

**Function:** `DetectConditionalTestLogic(test)`

1. For each `statement` in `test.statements`:
   - If `statement.type` is `"condition"` or `"loop"`:
     - Return **True**
2. Return **False**

---

## 3. Duplicate Assert Detection

**Function:** `DetectDuplicateAssert(test)`

1. Create `seen` ← new Set()
2. For each `assert` in `test.asserts`:
   - Set `uniqueKey` ← `assert.literalActual + " | " + assert.matcher + " | " + assert.literalExpected`
   - If `seen` contains `uniqueKey`:
     - Return **true**
   - Add `uniqueKey` to `seen`
3. Return **false**

---

## 4. Empty Test Detection

**Function:** `DetectEmptyTest(test)`

1. If `test.statements` is empty:
   - Return **True**
2. Return **False**

---

## 5. Exception Handling Detection

**Function:** `DetectExceptionHandling(test)`

1. For each `statement` in `test.statements`:
   - If `statement.type` is `"exceptionHandling"` or `"exceptionThrowing"`:
     - Return **True**
2. Return **False**

---

## 6. Ignored Test Detection

**Function:** `DetectIgnoredTest(test)`

1. Return `test.isIgnored`

---

## 7. Magic Number Test Detection

**Function:** `DetectMagicNumberTest(test)`

1. If length of `test.asserts` > 1:
   - For each `assert` in `test.asserts`:
     - If `IsNumeric(assert.literalActual)` **OR** `IsNumeric(assert.literalExpected)`:
       - Return **True**
2. Return **False**

---

## 8. Redundant Print Detection

**Function:** `DetectRedundantPrint(test)`

1. For each `event` in `test.events`:
   - If `event` = `"print"`:
     - Return **true**
2. Return **false**

---

## 9. Sleepy Test Detection

**Function:** `DetectSleepyTest(test)`

1. For each `event` in `test.events`:
   - If `event` = `"sleep"`:
     - Return **true**
2. Return **false**

---

## 10. Unknown Test Detection

**Function:** `DetectUnknownTest(test)`

1. If length of `test.asserts` = 0:
   - Return **True**
2. Return **False**

---
