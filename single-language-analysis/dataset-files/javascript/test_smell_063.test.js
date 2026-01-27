const { expect } = require('jest');

describe('OpadTest', () => {
    it("test_smell_063", () => {
        const myOpad = new Opad(new SerialNumber(new BigInteger("4")), null);
        expect(myOpad.hashCode()).toBe(4);
    });
});