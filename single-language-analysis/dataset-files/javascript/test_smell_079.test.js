const { expect } = require('jest');

describe('TailTest', () => {
    it("test_smell_079", () => {
        Tail.streamFactorial(56789);
    });
});