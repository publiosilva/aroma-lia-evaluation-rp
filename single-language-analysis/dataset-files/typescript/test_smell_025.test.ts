import { expect } from '@jest/globals';

describe('MoveTest', () => {
    it("test_smell_025", () => {
        /* old test, not working anymore, maybe it needs specific board
           probably has issue with the game needing a first roll of dice
           to choose a currentPlayer */
        const g = new Game(false);
        const b = g.getMyBoard();
        expect(b).not.toBeNull();
        try {
            b.makeStartingBoard(); /* regular game */
            expect(b).not.toBeNull();
        } catch (e) {
            /* isn't there a way to test without catching exceptions? */
            expect(true).toBe(false);
        }

        g.setCurrentPlayer(aiColor);
        b.myDice.roll(1, 1); /* alternative syntax:b1.myDice.roll(1,2) */
        expect(b.myDice.getDoubletMovesCountdown()).toBe(4);

        const sg = new StartGameStrategy();
        const best = sg.pickBestMove(b, aiColor);
        console.log(best);
        expect(best.isPossible()).toBe(true);
        const partials = best.getMyPartials();
        expect(partials.length).toBe(4);

        best.doMove();
        expect(b.myDice.getDoubletMovesCountdown()).toBe(0);
    });
});