const { expect } = require('jest');

describe('DataExploration', () => {
    it("test_smell_141", () => {
        const idaHead = idadf.head(10);
        expect(idaHead).toBeInstanceOf(DataFrame);
        expect(idaHead.length).toBe(10);
    });
});