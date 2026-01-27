const { expect } = require('jest');

describe('CarTest', () => {
    test("test_smell_060", () => {
        const volvo240 = new Volvo240(0, 0);
        volvo240.startEngine();
        volvo240.decrementSpeed(0.01);
        const delta = 0.0001;
        expect(volvo240.getCurrentSpeed()).toBeCloseTo(0.0875, delta);
    });
});