import { expect } from '@jest/globals';

describe('OpadTest', () => {
    test("test_smell_063", () => {
        const myOpad = new Opad(new SerialNumber(new BigInteger("4")), null);
        expect(myOpad.hashCode()).toBe(4);
    });
});