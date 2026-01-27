const { expect } = require('jest');

describe('TrieTest', () => {
    it("test_smell_013", () => {
        simpleT.insertAll(Array.from(toInsert));
        const wordMap = new Map();
        for (let i = 0; i < toInsert.length; i++) {
            if (wordMap.has(toInsert[i])) {
                const freq = wordMap.get(toInsert[i]);
                wordMap.set(toInsert[i], freq + 1);
            } else {
                wordMap.set(toInsert[i], 1);
            }
        }
        const children = simpleT.getRoot().getChildren();
        if (children != null) {
            const iterator = children[Symbol.iterator]();
            let result = iterator.next();
            while (!result.done) {
                const child = result.value;
                expect(child.getFreq()).toBe(wordMap.get(child.getKey()));
                result = iterator.next();
            }
        } 
    });
});