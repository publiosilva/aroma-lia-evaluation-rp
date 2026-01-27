const { expect } = require('jest');

describe('Poller', () => {
    test("test_smell_088", async () => {
        class CorrectFakePoller extends FakePoller {
            async validFunc() {
                // 
            }
        }

        const poller = new CorrectFakePoller();
        expect(poller.hasAlertNotify).toBe(false);
        const result = await poller.validFunc();
        expect(result).toBe(null);
    });
});