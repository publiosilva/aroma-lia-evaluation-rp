import { expect } from '@jest/globals';

describe('KMeans', () => {
    it("test_smell_138", () => {
        // Regression test on bad n_iter_ value. Previous bug n_iter_ was one off
        // it's right value (#11340).
        const km = new KMeans({ algorithm: "elkan", maxIter: 1 }).fit(X);
        expect(km.nIter_).toBe(1);
    });
});