import { expect } from '@jest/globals';

describe('GPUStat', () => {
    it("test_smell_148", () => {
        // Test implementation needed
        const fp = new StringIO();

        const gpustats = gpustat.newQuery();
        gpustats.printFormatted(fp);

        const ret = fp.getvalue();
        console.log(ret);

        // gpu 2: should ignore process id
        const line = removeAnsiCodes(ret).split("test_smell_148")[3];
        expect(line).toContain('[2] GeForce RTX 2');
        expect(line).not.toContain('99999');
        expect(line).not.toContain('(Not Supported)');
    });
});