import { expect } from '@jest/globals';
import { MyArrayUtil } from './MyArrayUtil'; // Adjust the import path as necessary
import { ArrayInversion } from './ArrayInversion'; // Adjust the import path as necessary
import { Pair } from './Pair'; // Adjust the import path as necessary
import * as fs from 'fs';

describe('ArrayInversionTest', () => {
    it.skip('debugSortAndCount', async () => {
        const file = 'resources/IntegerArray.txt';
        try {
            // console.log(Number.MAX_VALUE);
            const list: number[] = await MyArrayUtil.ListIntegerFromFile(file, 94650); // 94680
            console.log("list size:" + list.length);

            const A: number[] = MyArrayUtil.ListIntegersToIntegerArray(list);

            const D_total: Pair<number[], number> = ArrayInversion.SortAndCount(A, A.length, 0, A.length - 1);

            const D: number[] = D_total.getLeft();

            MyArrayUtil.checkArrayIntegerSorted(D);
            console.log("expect " + D_total.getRight() + " inversions");
            const expectedInversions: number = ArrayInversion.bruteForceCount(A);
            // console.log("expect " + expectedInversions + " inversions");
            expect(expectedInversions).toBe(D_total.getRight());

        } catch (e) {
            console.error(e);
            expect(true).toBe(false);
        }
    });
});