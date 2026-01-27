import { expect } from '@jest/globals';

describe('A', () => {
    it.skip('testStringCallback', () => {
        const callback = (code: string): number => {
            if (code === "r") {
                return 0;
            } else {
                return 1;
            }
        };

        const f = (this.module as any).string_callback;
        const r = f(callback);
        expect(r).toBe(0);
    });
});