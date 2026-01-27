const { expect } = require('jest');

describe('Lfu', () => {
    test("test_smell_107", () => {
        let filepath = null
        let cache = new Cache({ filepath: filepath, maxsize: 2, ttl: -1, policy: 'LFU' });

        const func = (a) => {
            return a;
        };

        let keys = () => {
            return Array.from(cache.items()).map(([key, value]) => key[1]);
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

        filepath = `${tmpdir}/cache`;
        cache = new Cache({ filepath: filepath, maxsize: 2, ttl: -1, policy: 'LFU' });

        keys = () => {
            return Array.from(cache.items()).map(([key, value]) => key[1]);
        };

        expect(func(1)).toBe(1);
        expect(func(2)).toBe(2);
        theKeys = keys();
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
    });
});