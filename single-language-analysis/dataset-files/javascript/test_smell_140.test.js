const { expect } = require('jest');

describe('A', () => {
    test.skip('testStringCallback', () => {
        const callback = (code) => {
            if (code === "r") {
                return 0;
            } else {
                return 1;
            }
        };

        const f = this.module.string_callback;
        const r = f(callback);
        expect(r).toBe(0);
    });
});