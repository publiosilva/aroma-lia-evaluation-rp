import { expect } from '@jest/globals';

describe('Tonus', () => {
    it("test_smell_090", () => {
        expect(ophis.FSHARP).toBe(ophis.GFLAT.enharmonics());
        expect(ophis.GFLAT.enharmonics(false, "chroma")).toBe(true);
        for (const chroma of ophis.westernChromaSet) {
            for (const enharmonicNote of chroma.enharmonics()) {
                expect(chroma).toBe(enharmonicNote);
            }
        }
    });
});