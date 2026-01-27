const { expect } = require('jest');

describe('ClassName', () => {
    test.skip("test_smell_125", () => {
        const outputMypy = OUTPUT_MYPY;
        if (path in outputMypy) {
            let msg = "Unexpected mypy output\n\n";
            msg += outputMypy[path].map(v => _stripFilename(v)).join("\n");
            throw new Error(msg);
        }
    });
});