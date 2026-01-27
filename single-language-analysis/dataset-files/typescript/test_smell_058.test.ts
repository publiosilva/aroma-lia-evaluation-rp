import { expect } from '@jest/globals';

describe('BeingTest', () => {
    test("test_smell_058", () => {
        const being = new TestBeing();    
        being.setVelocity(makeVector(0.5, 0.0, 0.0));
        being.updateTime();
        try {
            // Simulating sleep
            const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
            sleep(1000);
        } catch (e) { 
            expect(true).toBe(false); 
        }
        being.step();
        expect(being.getPosition().x).toBeCloseTo(0.5, 1e-2);
        expect(being.getPosition().y).toBeCloseTo(0.0, 1e-2);
        expect(being.getPosition().z).toBeCloseTo(0.0, 1e-2);
    });
});