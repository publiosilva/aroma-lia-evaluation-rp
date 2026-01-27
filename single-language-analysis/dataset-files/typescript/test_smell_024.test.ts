import { expect } from '@jest/globals';
import { MyArrayUtil } from './MyArrayUtil'; // Adjust the import path as necessary
import { ArrayInversion } from './ArrayInversion'; // Adjust the import path as necessary
import { Pair } from './Pair'; // Adjust the import path as necessary
import { promises as fs } from 'fs';

describe('ArrayInversionTest', () => {
    it.skip('testBigIntegerSortAndCount', async () => {
        const filePath = 'resources/IntegerArray.txt';
        try {
            const data = await fs.readFile(filePath, 'utf8');
            const list: number[] = MyArrayUtil.ListIntegerFromFile(data);

            const A: number[] = MyArrayUtil.ListIntegersToIntegerArray(list);

            const D_total: Pair<number[], number> = ArrayInversion.SortAndCount(A, A.length, 0, A.length - 1);

            const D: number[] = D_total.getLeft();

            MyArrayUtil.checkArrayIntegerSorted(D);

            const expectedInversions: BigInteger = ArrayInversion.BigInteger_bruteForceCount(A);
            console.log(`expect ${expectedInversions} inversions`);
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