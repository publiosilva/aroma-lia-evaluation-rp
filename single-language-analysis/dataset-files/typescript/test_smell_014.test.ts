import { expect } from '@jest/globals';

describe('BsTest', () => {
   test("test_smell_014", () => {
      let m: string[];
      try {
          m = EDI.processFile("edi/sampledata/ACME_IDOC_SHIPMNT02out.txt", "", "", "", false, false, 0, 0, "");
          if (m[0] === "0") {
              console.log("sample 856idoc...  pass");
          } else {
              console.log("sample 850idoc...  fail");
              console.log("m[1] message: " + m[1]);
          }
      } catch (e) {
          console.log("BS Exception: " + e.message);
      }
      expect(m[0]).toBe("0");
   });
});