const { expect } = require('jest');

describe('VoteTest', () => {
    test("test_smell_043", async () => {
        const vote = new Vote(3);
        
        const thread1 = new Promise((resolve) => {
            setTimeout(() => {
                try {
                    expect(vote.vote("1")).toBe("0");
                    resolve();
                } catch (e) {
                    throw new Error(e);
                }
            }, 1000);
        });

        const thread2 = new Promise((resolve) => {
            setTimeout(() => {
                try {
                    expect(vote.vote("0")).toBe("0");
                    resolve();
                } catch (e) {
                    throw new Error(e);
                }
            }, 500);
        });

        await Promise.all([thread1, thread2]);
        expect(vote.vote("0")).toBe("0");
    });
});