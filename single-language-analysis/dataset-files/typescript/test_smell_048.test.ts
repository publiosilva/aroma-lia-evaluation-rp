import { expect } from '@jest/globals';

describe('OOoBeanTest', () => {
    test("test_smell_048", async () => {
        let f: WriterFrame | null = null;
        try {
            f = new WriterFrame(100, 100, 500, 400, false, connection.getComponentContext());
            f.goToStart();
            f.pageDown();
            await new Promise(resolve => setTimeout(resolve, 1000));

            const capturer = new ScreenComparer(100, 100, 500, 400);
            capturer.grabOne();
            for (let i = 0; i < 100; i++) {
                f.removeOOoBean();
                f.addOOoBean();
            }

            f.goToStart();
            f.pageDown();
            await new Promise(resolve => setTimeout(resolve, getSleepTime(200)));
            capturer.grabTwo();

            if (!capturer.compare()) {
                expect(true).toBe(false);
                capturer.writeImages();
            }

            if (!f.checkUnoFramePosition()) {
                expect(true).toBe(false);
            }

        } finally {
            if (f !== null) {
                f.dispose();
            }
            if (!isWindows()) {
                await new Promise(resolve => setTimeout(resolve, 10000));
            }
        }
    });
});