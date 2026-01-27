const { expect } = require('jest');

describe('BeingTest', () => {
    it("test_smell_058", async () => {
        const being = new TestBeing();    
        being.setVelocity(makeVector(0.5, 0.0, 0.0));
        being.updateTime();
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
        } catch (e) { throw new Error(false); }
        being.step();
        expect(being.getPosition().x).toBeCloseTo(0.5, 1e-2);
        expect(being.getPosition().y).toBeCloseTo(0.0, 1e-2);
        expect(being.getPosition().z).toBeCloseTo(0.0, 1e-2);
    });
});