import { expect } from '@jest/globals';

describe('UnitTest', () => {
   test("test_smell_017", () => {
      let ii: number;
      for (ii = 0; ii < 20; ii++) {
         list.insertLast(ii);
      }
      expect(list.getCount()).toBe(20);

      ii = 0;
      while (!list.isEmpty()) {
         const test: number = list.removeFirst();
         expect(test).toBe(ii);
         ii++;
      }
      expect(list.getCount()).toBe(0);
   });
});