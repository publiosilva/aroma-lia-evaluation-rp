const { expect } = require('jest');

describe('ArrayInversionTest', () => {
    it.skip("test_smell_044", async () => {
        const file = new File("resources/IntegerArray.txt");
        try {
            // const list = MyArrayUtil.ListIntegerFromFile(file, 94650); // 94680
            console.log("list size:" + list.size());

            const A = MyArrayUtil.ListIntegersToIntegerArray(list);

            const D_total = ArrayInversion.SortAndCount(A, A.length, 0, A.length - 1);

            const D = D_total.getLeft();

            MyArrayUtil.checkArrayIntegerSorted(D);
            console.log("expect " + D_total.getRight() + " inversions");
            const expectedInversions = ArrayInversion.bruteForceCount(A);
            // console.log("expect " + expectedInversions + " inversions");
            expect(expectedInversions).toBe(D_total.getRight());

        } catch (e) {
            console.error(e);
            throw new Error();
        }
    });
});