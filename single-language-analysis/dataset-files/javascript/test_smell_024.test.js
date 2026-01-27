const { expect } = require('jest');

describe('ArrayInversionTest', () => {
    it.skip("test_smell_024", async () => {
        const file = new File("resources/IntegerArray.txt");
        try {
            const list = MyArrayUtil.ListIntegerFromFile(file);
            const A = MyArrayUtil.ListIntegersToIntegerArray(list);
            const D_total = ArrayInversion.SortAndCount(A, A.length, 0, A.length - 1);
            const D = D_total.getLeft();
            MyArrayUtil.checkArrayIntegerSorted(D);
            const expectedInversions = ArrayInversion.BigInteger_bruteForceCount(A);
            console.log("expect " + expectedInversions + " inversions");
            // expect(expectedInversions).toBe(D_total.getRight());
        } catch (e) {
            if (e.name === 'FileNotFoundException') {
                console.error(e);
                expect(true).toBe(false);
            } else if (e.name === 'IOException') {
                console.error(e);
                expect(true).toBe(false);
            }
        }
    });
});