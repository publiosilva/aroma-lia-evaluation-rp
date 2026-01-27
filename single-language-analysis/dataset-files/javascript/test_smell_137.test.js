const { expect } = require('jest');

describe('PandasContainer', () => {
    const IS64 = true; // Placeholder for actual condition

    it.skip('not compliant on 32-bit, xref #15865', () => {
        const testCases = [
            { value: 0.95, precision: 1, expectedVal: 1.0 },
            { value: 1.95, precision: 1, expectedVal: 2.0 },
            { value: -1.95, precision: 1, expectedVal: -2.0 },
            { value: 0.995, precision: 2, expectedVal: 1.0 },
            { value: 0.9995, precision: 3, expectedVal: 1.0 },
            { value: 0.99999999999999944, precision: 15, expectedVal: 1.0 },
        ];

        testCases.forEach(({ value, precision, expectedVal }) => {
            const df = new DataFrame([{ a_float: value }]);
            const encoded = df.toJson({ double_precision: precision });
            expect(encoded).toBe(`{"a_float":{"0":${expectedVal}}}`);
        });
    });
});