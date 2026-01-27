import { expect } from '@jest/globals';

describe('PlayerTest', () => {
    it.skip('interrupt_withoutGetChoice_givenRunning', async () => {
        const thread = arrangeNewGame();

        assertInterrupt(thread);
    });
});