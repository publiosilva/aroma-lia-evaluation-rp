// Original URL: https://github.com/jvaldiviezo9/path.py/blob/3684c4dc4896c174852b901b033e021a6267df2e/test_path.py#L107-L116

const { Path } = require('path');

describe('TestBasics', () => {
    it("test_smell_165", () => {
        /**
         * 
         */
        try {
            Path(null);
            throw new Error("DID NOT RAISE");
        } catch (e) {
            // pass
        }
    });
});