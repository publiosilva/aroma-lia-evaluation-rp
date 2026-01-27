const { expect } = require('jest');

describe('TreeTest', () => {
    it("test_smell_065", () => {
        console.log("Test first left of right child");
        const s = new Tree();
        s.add(4);
        s.add(2);
        s.add(3);
        s.add(1);
        s.add(6);
        s.add(7);
        s.remove(4);
        expect(s.checkContains(2)).toBe(true);
        expect(s.checkContains(4)).toBe(false);
        expect(s.checkContains(3)).toBe(true);
        expect(s.checkContains(1)).toBe(true);
        expect(s.checkContains(6)).toBe(true);
        expect(s.checkContains(7)).toBe(true);
    });
});