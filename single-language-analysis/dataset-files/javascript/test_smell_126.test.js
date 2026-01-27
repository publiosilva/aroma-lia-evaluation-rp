const { expect } = require('jest');

describe('IntegerOverflow', () => {
    it("test_smell_126", () => {
        try {
            project10.lex("12345678");
            expect(false).toBe(true);
        } catch {
        }
    });
});