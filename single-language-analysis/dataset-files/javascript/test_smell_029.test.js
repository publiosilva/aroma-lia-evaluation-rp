const { expect } = require('jest');

describe('GameTest', () => {
    test("test_smell_029", () => {
        const game = new Game(n3winAlgorithm, CALCULATION_DEPTH);
        const field = new Array(5).fill(null).map(() => new Array(5).fill(null));
        
        game.placeChipInColumn(field, 2, Chip.GREEN);
        game.placeChipInColumn(field, 2, Chip.RED);
        game.placeChipInColumn(field, 2, Chip.GREEN);
        game.placeChipInColumn(field, 2, Chip.GREEN);
        game.placeChipInColumn(field, 2, Chip.GREEN);
        let result = n3winAlgorithm.theWinnerIs(field);
        expect(result).toBe(Chip.GREEN);

        result = threeWinAlgorithm.theWinnerIs(field);
        expect(result).toBe(Chip.GREEN);
    });
});