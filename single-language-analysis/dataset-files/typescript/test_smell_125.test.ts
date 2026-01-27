import { expect } from '@jest/globals';

describe('Success', () => {
    it.skip('testSuccess', () => {
        // Test implementation needed
        const outputMypy = OUTPUT_MYPY;
        if (path in outputMypy) {
            let msg = "Unexpected mypy output\n\n";
            msg += outputMypy[path].map(v => _stripFilename(v)).join("\n");
            throw new Error(msg);
        }
    });
});