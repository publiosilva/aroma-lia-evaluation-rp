import { expect } from '@jest/globals';
import { MyArrayUtil } from './MyArrayUtil'; // Adjust the import path as necessary
import { ArrayInversion } from './ArrayInversion'; // Adjust the import path as necessary
import { Pair } from './Pair'; // Adjust the import path as necessary
import * as fs from 'fs';

describe('ArrayInversionTest', () => {
    it.skip('testSortAndCount', async () => {
        const file = 'resources/IntegerArray.txt';
        try {
            const list: number[] = await MyArrayUtil.ListIntegerFromFile(file, 93000); // todo: understand what's going on here

            const A: number[] = MyArrayUtil.ListIntegersToIntegerArray(list);

            const D_total: Pair<number[], number> = ArrayInversion.SortAndCount(A, A.length, 0, A.length - 1);

            const D: number[] = D_total.getLeft();

            MyArrayUtil.checkArrayIntegerSorted(D);

            const expectedInversions: number = ArrayInversion.bruteForceCount(A);
            console.log('-------------------------------------------');
            console.log(`ArrayInversionTest.testSortAndCount() expect ${expectedInversions} inversions`);
            console.log('-------------------------------------------');
            expect(expectedInversions).toBe(D_total.getRight() as number);

        } catch (e) {
            console.error(e);
            expect(true).toBe(false);
        }
    });
});