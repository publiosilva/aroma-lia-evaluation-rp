const { expect } = require('jest');

describe('Tonus', () => {
    it("test_smell_090", () => {
        expect(ophis.FSHARP).toBe(ophis.GFLAT.enharmonics());
        expect(ophis.GFLAT.enharmonics(false, "chroma")).toBeTruthy();
        for (const chroma of ophis.western_chroma_set) {
            for (const enharmonicNote of chroma.enharmonics()) {
                expect(chroma).toBe(enharmonicNote);
            }
        }
    });
});