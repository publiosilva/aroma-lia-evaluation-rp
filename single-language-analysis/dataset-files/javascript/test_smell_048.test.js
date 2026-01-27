const { expect } = require('jest');

describe('OOoBeanTest', () => {
    it("test_smell_048", async () => {
        let f = null;
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
                throw new Error("Painting error: adding and removing OOoBean repeatedly to java.lang.Frame.");
                capturer.writeImages();
            }

            if (!f.checkUnoFramePosition()) {
                throw new Error("Sizing error.");
            }

        } finally {
            if (f != null) {
                f.dispose();
            }
            if (!isWindows()) {
                await new Promise(resolve => setTimeout(resolve, 10000));
            }
        }
    });
});