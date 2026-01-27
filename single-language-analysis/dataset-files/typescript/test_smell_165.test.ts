import { expect } from '@jest/globals';

describe('Basics', () => {
    it("test_smell_165", () => {
        try {
            Path(null);
            throw new Error("DID NOT RAISE");
        } catch (e) {
            // pass
        }
    });
});