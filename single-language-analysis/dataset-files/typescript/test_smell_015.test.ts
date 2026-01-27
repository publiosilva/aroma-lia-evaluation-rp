import { expect } from '@jest/globals';

describe('GameTest', () => {
    test("test_smell_015", () => {
        const game = new Game(n3winAlgorithm, CALCULATION_DEPTH);
        const field: Chip[][] = new Array(5).fill(null).map(() => new Array(5).fill(null));

        game.botPlace(field, Chip.RED);
        let counter = 0;
        for (let x = 0; x < SIZE; x++) {
            for (let y = 0; y < SIZE; y++) {
                if (field[x][y] === Chip.RED) {
                    counter++;
                }
            }
        }
        expect(counter).toBe(1);
    });
});