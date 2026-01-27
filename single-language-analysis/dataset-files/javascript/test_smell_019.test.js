const { expect } = require('jest');

describe('OOoBeanTest', () => {
    test("test_smell_019", async () => {
        let f = null;
        try {
            f = new WriterFrame(100, 100, 500, 300, false, connection.getComponentContext());
            const b = f.getBean();
            for (let i = 0; i < 100; i++) {
                b.releaseSystemWindow();
                b.aquireSystemWindow();
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