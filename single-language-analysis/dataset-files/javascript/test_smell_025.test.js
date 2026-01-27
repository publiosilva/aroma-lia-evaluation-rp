const { expect } = require('jest');

describe('MoveTest', () => {
    test("test_smell_025", () => {
        g = new Game(false);
        b = g.getMyBoard();
        expect(b).toBeTruthy();
        try {
            b.makeStartingBoard();
            expect(b).toBeTruthy();
        } catch (e) {
            throw new Error(e.toString());
        }

        g.setCurrentPlayer(aiColor);
        b.myDice.roll(1, 1);
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