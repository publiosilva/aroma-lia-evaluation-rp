const { expect } = require('jest');

describe('OnlyOnErrors', () => {
    it("test_smell_106", () => {
        let x = 2;
        let callCount = 0;
        let raised = false;
        let n = 0;

        const fn = () => {
            callCount += 1;
            try {
                0 / x;
            } catch (error) {
                if (error instanceof ZeroDivisionError || error instanceof ConnectionError) {
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
        expect(fn()).toBe(2);
        expect(callCount).toBe(3);
        expect(raised).toBe(true);
        expect(fn()).toBe(2);
        x = 1;
        raised = false;
        expect(fn()).toBe(3);
        expect(callCount).toBe(5);
        expect(fn()).toBe(3);
        expect(raised).toBe(true);
        expect(callCount).toBe(6);
        fn._cache.clear();
        try {
            fn();
        } catch (error) {
            expect(error).toBeInstanceOf(ZeroDivisionError);
        }
    });
});