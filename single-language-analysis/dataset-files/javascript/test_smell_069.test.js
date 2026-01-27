const { expect } = require('jest');

describe('ClobProcessorTest', () => {
    it("test_smell_069", async () => {
        const content = "Safe searchable content.";
        await clobProcessor.saveDocument(null, content);
        // wait for the document to be indexed
        await new Promise(resolve => setTimeout(resolve, 5000));
        const results = await clobProcessor.searchFreeTextDocument("contents");
        console.log(results);
        expect(results).not.toHaveLength(0);
    });
});