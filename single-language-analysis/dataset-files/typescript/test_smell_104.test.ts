import { expect } from '@jest/globals';
import * as itertools from 'itertools'; // Assuming itertools is available in TypeScript

describe('ChromaSet', () => {
    it("test_smell_104", () => {
        for (const [x, y, z] of itertools.combinations(ophis.westernChromaSet, 3)) {
            const s = new ophis.ChromaSet(new Set([x, y, z]));
            const sDim = s.diminish();
            for (const chroma of s) {
                expect(chroma.diminish()).toBeTruthy();
                expect(chroma.diminish()).toBeDefined();
                expect(sDim.has(chroma.diminish())).toBe(true);
            }
        }
    });
});