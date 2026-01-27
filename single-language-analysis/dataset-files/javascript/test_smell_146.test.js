const { expect } = require('jest');

describe('GPUStat', () => {
    const nvidiaDriverVersion = NvidiaDriverMock.INSTANCES;

    it("test_smell_146", () => {
        nvidiaDriverVersion.forEach((version) => {
            const gpustats = gpustat.newQuery();
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
            unescaped = unescaped.splitlines().slice(1).join(os.linesep);

            expect(unescaped).toBe(MOCK_EXPECTED_OUTPUT_FULL_PROCESS);

            expect(gpustats.driverVersion).toBe(version.name);
            const g = gpustats.gpus[0];
            expect(g.memoryUsed).toBe(8000);
            expect(g.powerDraw).toBe(125);
            expect(g.utilization).toBe(76);
            expect(g.processes).toBeTruthy();
            expect(g.processes[0].pid).toBe(48448);
        });
    });
});