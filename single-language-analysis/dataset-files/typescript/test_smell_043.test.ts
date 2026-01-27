import { expect } from '@jest/globals';

describe('VoteTest', () => {
    test("test_smell_043", async () => {
        const vote = new Vote(3);
        
        const firstThread = new Promise<void>((resolve) => {
            setTimeout(() => {
                try {
                    expect(vote.vote("1")).toBe("0");
                    resolve();
                } catch (e) {
                    throw new Error(e);
                }
            }, 1000);
        });

        const secondThread = new Promise<void>((resolve) => {
            setTimeout(() => {
                try {
                    expect(vote.vote("0")).toBe("0");
                    resolve();
                } catch (e) {
                    throw new Error(e);
                }
            }, 500);
        });

        await Promise.all([firstThread, secondThread]);
        expect(vote.vote("0")).toBe("0");
    });
});