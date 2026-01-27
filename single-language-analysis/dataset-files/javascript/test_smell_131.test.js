const { expect } = require('jest');

describe('GPUStat', () => {
    test.skip('noTERM', () => {
        process.env.TERM = '';

        const s = captureOutput('gpustat', '--color', '--no-header').rstrip();
        console.log(s);
        expect(removeAnsiCodes(s)).toBe(MOCK_EXPECTED_OUTPUT_DEFAULT);
        
        expect(s.includes('\x1b[36m')).toBe(true);
        expect(s.includes('\x0f')).toBe(false);
    });
});