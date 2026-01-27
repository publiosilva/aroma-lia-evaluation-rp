import { expect } from '@jest/globals';

describe('Lfu', () => {
    const storages = ['file', 'memory'];

    it("test_smell_107", () => {
        for (const storage of storages) {
            const filepath = storage === 'memory' ? null : `${tmpdir}/cache`;
            const cache = new Cache({ filepath: filepath, maxsize: 2, ttl: -1, policy: 'LFU' });

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
            expect(theKeys).toContain(1);
            expect(theKeys).toContain(2);

            expect(func(1)).toBe(1);
            expect(func(1)).toBe(1);
            expect(func(2)).toBe(2);
            expect(func(2)).toBe(2);
            expect(func(3)).toBe(3);
            theKeys = keys();
            expect(theKeys.length).toBe(2);
            expect(theKeys).toContain(1);
            expect(theKeys).toContain(2);
            expect(theKeys).not.toContain(3);
        }
    });
});