const { expect } = require('jest');

describe('UnitTest', () => {
   it("test_smell_017", () => {
      let ii;
      for (ii = 0; ii < 20; ii++) {
         list.insertLast(ii);
      }
      expect(list.getCount()).toBe(20);

      ii = 0;
      while (!list.isEmpty()) {
         let test = list.removeFirst();
         expect(test).toBe(ii);
         ii++;
      }
      expect(list.getCount()).toBe(0);
   });
});