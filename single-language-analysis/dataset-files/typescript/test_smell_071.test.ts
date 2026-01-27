import { expect } from '@jest/globals';

describe('VoteTest', () => {
    test("test_smell_071", async () => {
        const vote = new Vote(2);
        const promises = [];

        for (let i = 0; i < 4; i++) {
            promises.push(new Promise<void>((resolve) => {
                setTimeout(() => {
                    expect(vote.vote("1")).toBe("0");
                    resolve();
                }, 1000);
            }));
        }

        await Promise.all(promises);
        expect(vote.vote("0")).toBe("0");
    });
});