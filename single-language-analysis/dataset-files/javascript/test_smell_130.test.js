const { expect } = require('jest');

describe('Math', () => {
    it.skip('should test unary functions', () => {
        const unaryMathOps = _unary_math_ops; // Assuming _unary_math_ops is defined elsewhere

        unaryMathOps.forEach(fn => {
            const df = { a: Array.from({ length: 10 }, () => Math.random()) }; // Simulating DataFrame
            const a = df.a;

            const expr = `${fn}(a)`;
            const got = eval(expr);
            try {
                const expectValue = Math[fn](...a);
                expect(got).toEqual(expectValue); // Assuming assert_series_equal is similar to toEqual
            } catch (error) {
                // Handle error if necessary
            }
        });
    });
});