const { expect } = require('jest');

describe('KMeans', () => {
    it("test_smell_138", () => {
        const km = new KMeans({ algorithm: "elkan", maxIter: 1 }).fit(X);
        expect(km.nIter_).toBe(1);
    });
});