const { expect } = require('jest');

describe('GPUStat', () => {
    test("test_smell_150", async () => {
        const scenarioFailingOneGpu = await getScenarioFailingOneGpu(); // Assuming this function retrieves the scenario
        const fp = new StringIO();
        const gpustats = gpustat.newQuery();
        gpustats.printFormatted(fp, { showHeader: false });
        const ret = fp.getvalue();
        console.log(ret);

        const lines = removeAnsiCodes(ret).split("test_smell_150");
        const message = scenarioFailingOneGpu.expectedMessage;

        const line = lines[2];
        expect(line).toContain('[2] ((' + message + '))');
        expect(line).not.toContain('99999');
        expect(line).toContain('??°C,  ?? %');
        expect(line).toContain('?? /    ?? MB');

        expect(lines[0]).toContain('[0] GeForce GTX TITAN 0');
        expect(lines[1]).toContain('[1] GeForce GTX TITAN 1');
    });
});