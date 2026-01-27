const { expect } = require('jest');

describe('CellTest', () => {
    it("test_smell_064", () => {
        expect(Cell.calculateMean([])).toBeCloseTo(0.0, 0.001);
        expect(Cell.calculateMean(null)).toBeCloseTo(0.0, 0.001);
        expect(Cell.calculateMean([1.0, 2.0, 3.0])).toBeCloseTo(2.0, 0.001);
    });
});