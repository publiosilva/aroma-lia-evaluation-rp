const { expect } = require('jest');

describe('PlayerTest', () => {
    test.skip('interrupt_withoutGetChoice_givenRunning', async () => {
        const thread = arrangeNewGame();

        assertInterrupt(thread);
    });
});