import { expect } from '@jest/globals';

describe('TrieTest', () => {
  test("test_smell_013", () => {
    simpleT.insertAll(Array.from(toInsert));
    const wordMap: Record<string, number> = {};
    for (let i = 0; i < toInsert.length; i++) {
      if (wordMap.hasOwnProperty(toInsert[i])) {
        const freq = wordMap[toInsert[i]];
        wordMap[toInsert[i]] = freq + 1;
      } else {
        wordMap[toInsert[i]] = 1;
      }
    }
    const children: Collection<TrieNode> | null = simpleT.getRoot().getChildren();
    if (children !== null) {
      const iterator: Iterator<TrieNode> = children[Symbol.iterator]();
      let result = iterator.next();
      while (!result.done) {
        const child: TrieNode = result.value;
        expect(child.getFreq()).toBe(wordMap[child.getKey()]);
        result = iterator.next();
      }
    }
  });
});