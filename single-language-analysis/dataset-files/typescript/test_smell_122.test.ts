import { expect } from '@jest/globals';

describe('A', () => {
    it("test_smell_122", () => {
        // Segfaults if the callback handling is not threadsafe

        const errors: string[] = [];

        const cb = () => {
            // Sleep here to make it more likely for another thread
            // to call their callback at the same time.
            setTimeout(() => { }, 1e-3);

            // Check reentrancy
            const r = this.module.t(() => 123);
            expect(r).toBe(123);

            return 42;
        };

        const runner = (name: string) => {
            try {
                for (let j = 0; j < 50; j++) {
                    const r = this.module.t(cb);
                    expect(r).toBe(42);
                    this.checkFunction(name);
                }
            } catch (error) {
                errors.push(error.stack || '');
            }
        };

        const threads = Array.from({ length: 20 }, (_, n) =>
            ["t", "t2"].map(arg => new Thread(() => runner(arg)))
        ).flat();

        for (const t of threads) {
            t.start();
        }

        for (const t of threads) {
            t.join();
        }

        const errorMessages = errors.join("\n\n");
        if (errorMessages) {
            throw new Error(errorMessages);
        }
    });
});
