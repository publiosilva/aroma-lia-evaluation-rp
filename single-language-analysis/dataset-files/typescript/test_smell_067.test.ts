import { expect } from '@jest/globals';

describe('PeoTest', () => {
    it("test_smell_067", () => {
        console.log("main");
        const args: string[] | null = null;
        Peo.main(args);
        expect(true).toBe(false);
    });
});