const { expect } = require('jest');

describe('OpadTest', () => {
    test("test_smell_026", () => {
        const myArr = [];
        let mySet = new Set(myArr);
        const myOpad = new Opad(new SerialNumber(new BigInteger("4")), Optional.of(mySet));

        // empty
        expect(Optional.of(mySet)).toBe(myOpad.getDescription());

        // One element
        myArr.push("OPAD");
        mySet = new Set(myArr);
        myOpad = new Opad(new SerialNumber(new BigInteger("4")), Optional.of(mySet));
        expect(Optional.of(mySet)).toBe(myOpad.getDescription());

        // Multiple Elements
        myArr.push("is");
        myArr.push("the");
        myArr.push("Product");
        mySet = new Set(myArr);
        myOpad = new Opad(new SerialNumber(new BigInteger("4")), Optional.of(mySet));
        expect(Optional.of(mySet)).toBe(myOpad.getDescription());
    });
});