const { expect } = require('jest');

describe('OOoBeanTest', () => {
    it("test_smell_078", async () => {
        let f = null;
        try {
            f = new WriterFrame(100, 100, 500, 400, false, connection.getComponentContext());
            f.setText("OOoBean test.");
            await new Promise(resolve => setTimeout(resolve, 1000));
        } finally {
            if (f != null) {
                f.dispose();
            }
        }
    });
});