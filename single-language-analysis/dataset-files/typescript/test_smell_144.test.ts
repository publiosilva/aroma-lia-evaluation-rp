import { expect } from '@jest/globals';

describe('GPUStat', () => {
    it("test_smell_144", async () => {
        // Test implementation needed
        const captureOutput = this.captureOutput;

        const removeAnsiCodesAndHeaderLine = (s: string): string => {
            const unescaped = removeAnsiCodes(s);
            return unescaped.split("test_smell_144").slice(1).join('\n');
        };

        let s = await captureOutput('gpustat');
        expect(removeAnsiCodesAndHeaderLine(s)).toBe(MOCK_EXPECTED_OUTPUT_DEFAULT);

        s = await captureOutput('gpustat', '--version');
        expect(s.startsWith('gpustat ')).toBe(true);
        console.log(s);

        s = await captureOutput('gpustat', '--no-header');
        expect(s.split("test_smell_144")[0]).toContain("[0]");

        s = await captureOutput('gpustat', '-a');  // --show-all
        expect(removeAnsiCodesAndHeaderLine(s)).toBe(MOCK_EXPECTED_OUTPUT_FULL);

        s = await captureOutput('gpustat', '--color');
        expect(s).not.toContain('\x0f'); // Extra \x0f found (see issue #32)
        expect(removeAnsiCodesAndHeaderLine(s)).toBe(MOCK_EXPECTED_OUTPUT_DEFAULT);

        s = await captureOutput('gpustat', '--no-color');
        const unescaped = removeAnsiCodes(s);
        expect(s).toBe(unescaped); // should have no ansi code
        expect(removeAnsiCodesAndHeaderLine(s)).toBe(MOCK_EXPECTED_OUTPUT_DEFAULT);

        s = await captureOutput('gpustat', '--no-processes');
        expect(removeAnsiCodesAndHeaderLine(s)).toBe(MOCK_EXPECTED_OUTPUT_NO_PROCESSES);

        s = await captureOutput('gpustat', '--id', '1,2');
        expect(removeAnsiCodesAndHeaderLine(s)).toBe(
            MOCK_EXPECTED_OUTPUT_DEFAULT.split("test_smell_144").slice(1, 3).join('\n')
        );
    });
});