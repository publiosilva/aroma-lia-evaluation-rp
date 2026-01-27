const { expect } = require('jest');

describe('Speed', () => {
    test.skip("5 seconds is also too long", () => {
        const t0 = time.now();
        const results = checkNumbersPrimeConcurrently();
        const count = results.reduce((acc, result) => acc + (result[1] ? 1 : 0), 0);
        const deltaTime = time.now() - t0;
        expect(count).toBe(112);
        expect(deltaTime).toBeLessThan(5);
    });
});