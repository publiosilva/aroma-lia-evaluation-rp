import { expect } from '@jest/globals';

describe('Speed', () => {
    it.skip("5 seconds is also too long", () => {
        const t0: number = Date.now();
        const results = checkNumbersPrimeConcurrently();
        const count: number = results.filter(result => result[1]).length;
        const deltaTime: number = (Date.now() - t0) / 1000;
        expect(count).toBe(112);
        expect(deltaTime).toBeLessThan(5);
    });
});