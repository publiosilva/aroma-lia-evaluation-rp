const { expect } = require('jest');

describe('EmptyInvalidWSDL', () => {
    it("test_smell_124", () => {
        delete global.e;
        let e;
        try {
            e = testutils.clientFromWsdl("");
        } catch (error) {
            e = error;
        }
        expect(e.message).toBe("no element found");
    });
});