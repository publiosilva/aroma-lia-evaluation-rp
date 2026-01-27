const { expect } = require('jest');

describe('GPUStat', () => {
    it("test_smell_144", () => {
        const captureOutput = this.captureOutput;

        const removeAnsiCodesAndHeaderLine = (s) => {
            const unescaped = removeAnsiCodes(s);
            return unescaped.splitlines().slice(1).join('\n');
        };

        let s = captureOutput('gpustat');
        expect(removeAnsiCodesAndHeaderLine(s)).toBe(MOCK_EXPECTED_OUTPUT_DEFAULT);

        s = captureOutput('gpustat', '--version');
        expect(s.startsWith('gpustat ')).toBe(true);
        console.log(s);

        s = captureOutput('gpustat', '--no-header');
        expect(s.splitlines()[0]).toContain("[0]");

        s = captureOutput('gpustat', '-a');
        expect(removeAnsiCodesAndHeaderLine(s)).toBe(MOCK_EXPECTED_OUTPUT_FULL);

        s = captureOutput('gpustat', '--color');
        expect(s.includes('\x0f')).toBe(false);
        expect(removeAnsiCodesAndHeaderLine(s)).toBe(MOCK_EXPECTED_OUTPUT_DEFAULT);

        s = captureOutput('gpustat', '--no-color');
        const unescaped = removeAnsiCodes(s);
        expect(s).toBe(unescaped);
        expect(removeAnsiCodesAndHeaderLine(s)).toBe(MOCK_EXPECTED_OUTPUT_DEFAULT);

        s = captureOutput('gpustat', '--no-processes');
        expect(removeAnsiCodesAndHeaderLine(s)).toBe(MOCK_EXPECTED_OUTPUT_NO_PROCESSES);

        s = captureOutput('gpustat', '--id', '1,2');
        expect(removeAnsiCodesAndHeaderLine(s)).toBe(
            MOCK_EXPECTED_OUTPUT_DEFAULT.splitlines().slice(1, 3).join('\n')
        );
    });
});