const { expect } = require('jest');

describe('MainTest', () => {
    test("test_smell_047", () => {
        try {
            new FileNotFoundException();
            throw new Error("Exception not thrown");
        } catch (e) {
            expect(e).toBeInstanceOf(UnsupportedOperationException);
            expect(e.message).toBe("Operation Not Supported");
        }
    });
});