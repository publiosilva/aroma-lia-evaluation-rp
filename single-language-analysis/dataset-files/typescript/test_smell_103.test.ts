import { expect } from '@jest/globals';

describe('GPUStat', () => {
    it("test_smell_103", async () => {
        // Test implementation needed
        const captureOutput = this.captureOutput;
        console.log('');

        const testOpts: string[] | [string, string][] = [];
        testOpts.push('-a', '-c', '-u', '-p', '-e', '-P', '-f');
        testOpts.push(['-e', ''], ['-P', '']);
        testOpts.push(['-e', 'enc,dec'], '-Plimit,draw');
        testOpts.push('-cup', '-cpu', '-cufP'); // 'cpuePf'

        for (const opt of testOpts) {
            let currentOpt: string[];
            if (typeof opt === 'string') {
                currentOpt = [opt];
            } else {
                currentOpt = opt;
            }

            console.log(
                '\x1b[30m\x1b[43m', // black_on_yellow
                '$ gpustat ' + currentOpt.map(o => shlex.quote(o)).join(' '),
                '\x1b(B\x1b[m',
                ''
            );
            const s = await captureOutput('gpustat', ...currentOpt);

            // TODO: Validate output without hardcoding expected outputs
            console.log(s);
        }

        // Finally, unknown args
        await expect(captureOutput('gpustat', '--unrecognized-args-in-test')).rejects.toThrow(AssertionError);
    });
});