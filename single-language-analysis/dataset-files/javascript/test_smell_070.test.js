const { expect } = require('jest');

describe('bsTest', () => {
    it("test_smell_070", () => {
        let m;
        try {
            m = EDI.processFile("edi/sampledata/ACME_XML_order.xml", "", "", "", false, false, 0, 0, "");
            if (m[0] === "0") {
                console.log("sample 850xml...   pass");
            } else {
                console.log("sample 850xml...   fail");
                console.log("m[1] message: " + m[1]);
            }
        } catch (e) {
            console.log("BS Exception: " + e.message);
        }
        expect(m[0]).toBe("0");
    });
});