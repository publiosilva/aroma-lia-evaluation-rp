import { expect } from '@jest/globals';

describe('DeckTest', () => {
    test("test_smell_018", () => {
        try {
            const game = new Main();
            for (let numPlayers = 2; numPlayers < 10; numPlayers++) {
                const winners: number[] = new Array(numPlayers + 1).fill(0);
                for (let k = 0; k < 1000; k++) {
                    const result: number = game.playBlackjack(numPlayers);
                    const hands: BlackjackHand[] = game.getBlackjackHands();
                    expect(hands).not.toBeNull();
                    expect(hands.length).toBe(numPlayers);
                    let winner: number = 0;

                    for (let i = 1; i < hands.length; i++) {
                        expect(hands[i]).not.toBeNull();
                        if (hands[i].getBlackjackValue() > hands[winner].getBlackjackValue()) {
                            winner = i;
                        } else if (hands[i].getBlackjackValue() === hands[winner].getBlackjackValue()) {
                            winner = -1;
                            break;
                        }
                    }
                    expect(result).toBe(winner);
                    if (winner === -1) winner = hands.length;
                    winners[winner] += 1;
                }
                for (let i = 0; i < winners.length; i++) {
                    expect(winners[i]).toBeGreaterThan(0);
                }
            }
        } catch (e) {
            expect(true).toBe(false);
        }
    });
});