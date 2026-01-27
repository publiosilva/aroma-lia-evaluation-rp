const { expect } = require('jest');

describe('PeoTest', () => {
    it("test_smell_067", () => {
        console.log("main");
        const args = null;
        Peo.main(args);
        throw new Error("The test case is a prototype.");
    });
});