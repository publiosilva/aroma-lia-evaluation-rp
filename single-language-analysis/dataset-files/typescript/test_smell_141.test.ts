import { expect } from '@jest/globals';

describe('DataExploration', () => {
    it("test_smell_141", async () => {
        const idaHead = await idadf.head(10);
        expect(idaHead).toBeInstanceOf(DataFrame);
        expect(idaHead.length).toBe(10);
    });
});