const { expect } = require('jest');

describe('ArrayInversionTest', () => {
    test.skip("test_smell_008", async () => {
        const file = new File("resources/IntegerArray.txt");
        try {
            const list = await MyArrayUtil.ListIntegerFromFile(file, 93000);

            const A = MyArrayUtil.ListIntegersToIntegerArray(list);

            const D_total = ArrayInversion.SortAndCount(A, A.length, 0, A.length - 1);

            const D = D_total.getLeft();

            MyArrayUtil.checkArrayIntegerSorted(D);

            const expectedInversions = ArrayInversion.bruteForceCount(A);
            console.log("-------------------------------------------");
            console.log("ArrayInversionTest.testSortAndCount() expect " + expectedInversions + " inversions");
            console.log("-------------------------------------------");
            expect(expectedInversions).toBe(D_total.getRight());

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