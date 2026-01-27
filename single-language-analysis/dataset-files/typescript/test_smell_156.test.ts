import { expect } from '@jest/globals';

describe('HelloWorld', () => {
    it("test_smell_156", async () => {
        const p = Player.fromDescription("videotestsrc ! fakesink");
        await p.play();
        await new Promise(resolve => setTimeout(resolve, 5000));
        await p.stop();
    });
});