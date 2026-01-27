import { expect } from '@jest/globals';

describe('OnlyOnErrors', () => {
    it("test_smell_106", () => {
        let x: number = 2;
        let callCount: number = 0;
        let raised: boolean = false;
        let n: number = 0;

        const fn = () => {
            callCount += 1;
            try {
                0 / x;
            } catch (error) {
                if (error instanceof ZeroDivisionError) {
                    raised = true;
                    throw error;
                }
            }
            n += 1;
            x -= 1;
            return n;
        };

        expect(fn()).toBe(1);
        expect(callCount).toBe(1);
        expect(fn()).toBe(2);
        expect(callCount).toBe(2);
        expect(x).toBe(0);
        expect(fn()).toBe(2); // ZeroDivision and returning cached result
        expect(callCount).toBe(3);
        expect(raised).toBe(true);
        expect(fn()).toBe(2);
        x = 1;
        raised = false;
        expect(fn()).toBe(3);
        expect(callCount).toBe(5);
        expect(fn()).toBe(3); // ZeroDivision and returning cached result
        expect(raised).toBe(true);
        expect(callCount).toBe(6);
        fn._cache.clear();
        expect(() => fn()).toThrow(ZeroDivisionError);
    });
});