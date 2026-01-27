const { expect } = require('jest');

describe('GameTest', () => {
    test("test_smell_062", () => {
        const game = new Game(n3winAlgorithm, CALCULATION_DEPTH);
        const field = new Array(5).fill(null).map(() => new Array(5).fill(null));
        const result = game.liklihoodToWin(0, field, 1, Chip.GREEN);
        expect(result).toBeCloseTo(0.40, 0.01);
    });
});