import { expect } from '@jest/globals';

describe('OOoBeanTest', () => {
    test("test_smell_019", async () => {
        let f: WriterFrame | null = null;
        try {
            f = new WriterFrame(100, 100, 500, 300, false, connection.getComponentContext());
            const b = f.getBean();
            for (let i = 0; i < 100; i++) {
                b.releaseSystemWindow();
                b.aquireSystemWindow();
            }
            if (!f.checkUnoFramePosition()) {
                expect(true).toBe(false); // fail("Sizing error.");
            }
        } finally {
            if (f !== null) {
                f.dispose();
            }
            if (!isWindows()) {
                await new Promise(resolve => setTimeout(resolve, 10000)); // Thread.sleep(10000);
            }
        }
    });
});