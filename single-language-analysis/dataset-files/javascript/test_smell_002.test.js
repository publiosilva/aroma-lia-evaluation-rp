const { expect } = require('jest');

describe('GitTest', () => {
    it("test_smell_002", () => {
        // Call init method
        Git.initialize();

        // Checks if index and objects were created
        expect(new File("index").isFile()).toBe(true);
        expect(new File("objects").isDirectory()).toBe(true);
    });
});