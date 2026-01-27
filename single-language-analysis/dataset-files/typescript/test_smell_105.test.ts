import { expect } from '@jest/globals';

describe('Lru', () => {
  const storages = ['file', 'memory'];

  it("test_smell_105", () => {
    for (const storage of storages) {
      const filepath: string | null = storage === 'memory' ? null : `${tmpdir}/cache`;
      const cache = new Cache({ filepath: filepath, maxsize: 2, ttl: -1, policy: 'LRU' });

      const func = cache((a: number) => {
        return a;
      });

      const keys = () => {
        return Array.from(cache.items()).map(([key]) => key);
      };

      expect(func(1)).toBe(1);
      expect(func(2)).toBe(2);
      let theKeys = keys();
      expect(theKeys.length).toBe(2);
      expect(theKeys.includes(1)).toBe(true);
      expect(theKeys.includes(2)).toBe(true);

      expect(func(1)).toBe(1);
      expect(func(3)).toBe(3);
      theKeys = keys();
      expect(theKeys.length).toBe(2);
      expect(theKeys.includes(1)).toBe(true);
      expect(theKeys.includes(3)).toBe(true);
      expect(theKeys.includes(2)).toBe(false);
    }
  });
});