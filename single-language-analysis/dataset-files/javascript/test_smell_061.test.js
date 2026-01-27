const { expect } = require('jest');

describe('AppTest', () => {
    test("test_smell_061", () => {
        expect(App.findMax([1, 2, 30, 4])).toBe(30);
    });
});