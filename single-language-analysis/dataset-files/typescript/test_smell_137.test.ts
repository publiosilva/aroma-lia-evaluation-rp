import { expect } from '@jest/globals';

describe('PandasContainer', () => {
    const IS64 = true; // Placeholder for actual condition

    it.skip('not compliant on 32-bit, xref #15865', () => {
        const testCases: [number, number, number][] = [
            [0.95, 1, 1.0],
            [1.95, 1, 2.0],
            [-1.95, 1, -2.0],
            [0.995, 2, 1.0],
            [0.9995, 3, 1.0],
            [0.99999999999999944, 15, 1.0],
        ];

        testCases.forEach(([value, precision, expectedVal]) => {
            const df = new DataFrame([{ a_float: value }]);
            const encoded = df.toJson({ double_precision: precision });
            expect(encoded).toBe(`{"a_float":{"0":${expectedVal}}}`);
        });
    });
});