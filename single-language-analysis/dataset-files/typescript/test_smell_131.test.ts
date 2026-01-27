import { expect } from '@jest/globals';

describe('GPUStat', () => {
    it.skip('no TERM', () => {
        // Test implementation needed
        const term = "";
        monkeypatch.setenv("TERM", term);

        const s: string = captureOutput('gpustat', '--color', '--no-header').trimEnd();
        console.log(s);
        expect(removeAnsiCodes(s)).toBe(MOCK_EXPECTED_OUTPUT_DEFAULT);
        expect(s.includes('\x1b[36m')).toBe(true);
        expect(s.includes('\x0f')).toBe(false);
    });
});