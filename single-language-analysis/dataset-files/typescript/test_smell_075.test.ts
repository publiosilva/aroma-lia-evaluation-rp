import { expect } from '@jest/globals';

describe('ClobProcessorTest', () => {
    it("test_smell_075", async () => {
        const searchTerm: string = "content";
        await clobProcessor.saveDocument(null, "This is a test content.");
        // wait for the document to be indexed
        await new Promise(resolve => setTimeout(resolve, 5000));
        const results: Array<string> = await clobProcessor.searchContainDocument(searchTerm);
        console.log(results);
        expect(results).not.toHaveLength(0);
    });
});