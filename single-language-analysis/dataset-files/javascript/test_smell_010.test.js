const { expect } = require('jest');

describe('BeingTest', () => {
    it("test_smell_010", async () => {
        const being = new TestBeing();    
        being.updateTime();
        try {
            await new Promise(resolve => setTimeout(resolve, 10));
        } catch (e) { expect(true).toBe(false); }
        const elapsed = being.updateTime();
        expect(elapsed).toBeCloseTo(1e7, 1e6); // this COULD fail if the system is running slow
    });
});