const { expect } = require('jest');

describe('GPUStat', () => {
    it("test_smell_148", () => {
        const fp = new StringIO();

        const gpustats = gpustat.newQuery();
        gpustats.printFormatted({ fp: fp });

        const ret = fp.getvalue();
        console.log(ret);

        const line = removeAnsiCodes(ret).split("test_smell_148")[3];
        expect(line).toContain('[2] GeForce RTX 2');
        expect(line).not.toContain('99999');
        expect(line).not.toContain('(Not Supported)');
    });
});