const { expect } = require('jest');

describe('ClobProcessorTest', () => {
    it("test_smell_075", async () => {
        const searchTerm = "content";
        await clobProcessor.saveDocument(null, "This is a test content.");
        // wait for the document to be indexed
        await new Promise(resolve => setTimeout(resolve, 5000));
        const results = await clobProcessor.searchContainDocument(searchTerm);
        console.log(results);
        expect(results).not.toHaveLength(0);
    });
});