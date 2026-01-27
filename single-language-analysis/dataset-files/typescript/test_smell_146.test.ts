import { expect } from '@jest/globals';

describe('GPUStat', () => {
    const nvidiaDriverVersion = NvidiaDriverMock.INSTANCES;

    it("test_smell_146", async () => {
        // A basic functionality test, in a case where everything is normal.
        for (const version of nvidiaDriverVersion) {
            const gpustats = await gpustat.newQuery();
            const fp = new StringIO();
            gpustats.printFormatted({
                fp: fp,
                noColor: false,
                showUser: true,
                showCmd: true,
                showFullCmd: true,
                showPid: true,
                showFanSpeed: true,
                showCodec: "enc,dec",
                showPower: true,
            });

            const result = fp.getvalue();
            console.log(result);

            let unescaped = removeAnsiCodes(result);
            // remove first line (header)
            unescaped = unescaped.split("test_smell_146").slice(1).join('\n');

            expect(unescaped).toBe(MOCK_EXPECTED_OUTPUT_FULL_PROCESS);

            // verify gpustat results (not exhaustive yet)
            expect(gpustats.driverVersion).toBe(version.name);
            const g: gpustat.GPUStat = gpustats.gpus[0];
            expect(g.memoryUsed).toBe(8000);
            expect(g.powerDraw).toBe(125);
            expect(g.utilization).toBe(76);
            expect(g.processes).not.toBeNull();
            expect(g.processes[0].pid).toBe(48448);
        }
    });
});