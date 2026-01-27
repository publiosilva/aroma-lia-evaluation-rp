import { expect } from '@jest/globals';

describe('ClobProcessorTest', () => {
    it("test_smell_069", async () => {
        const content: string = "Safe searchable content.";
        await clobProcessor.saveDocument(null, content);
        // wait for the document to be indexed
        await new Promise(resolve => setTimeout(resolve, 5000));
        const results: Array<string> = await clobProcessor.searchFreeTextDocument("contents");
        console.log(results);
        expect(results).not.toHaveLength(0);
    });
});