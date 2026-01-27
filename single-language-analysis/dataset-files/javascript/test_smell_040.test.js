const { expect } = require('jest');

describe('funcTest', () => {
    it("test_smell_040", () => {
        const fakeJsonData = "Deathcounter: 0";
        try {
            const tempFilePath = require('fs').mkdtempSync('tempTestFile');
            require('fs').writeFileSync(tempFilePath + '/tempTestFile.json', fakeJsonData);

            const result = func.readJsonFromFile();

            expect(result).toBe(0);

            require('fs').unlinkSync(tempFilePath + '/tempTestFile.json');
        } catch (e) {
            throw new Error(e);
        }
    });
});