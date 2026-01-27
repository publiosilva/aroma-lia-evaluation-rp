const { expect } = require('jest');

describe('LoopTest', () => {
    it("test_smell_005", () => {
        expect(loopObj.loop(4)).toBe("1223334444");
        expect(loopObj.loop(1)).toBe("1");
        expect(loopObj.loop(3)).toBe("122333");
    });
});