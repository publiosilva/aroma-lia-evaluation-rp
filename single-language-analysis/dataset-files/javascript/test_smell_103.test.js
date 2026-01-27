const { expect } = require('jest');

describe('GPUStat', () => {
    it("test_smell_103", () => {
        const captureOutput = this.captureOutput;
        console.log('');

        const testOpts = [];
        testOpts.push('-a', '-c', '-u', '-p', '-e', '-P', '-f');
        testOpts.push(['-e', '']);
        testOpts.push(['-P', '']);
        testOpts.push(['-e', 'enc,dec'], '-Plimit,draw');
        testOpts.push('-cup', '-cpu', '-cufP');

        for (const opt of testOpts) {
            if (typeof opt === 'string') {
                opt = [opt];
            }

            console.log('\x1b[30m\x1b[43m',  // black_on_yellow
                '$ gpustat ' + opt.map(o => shlex.quote(o)).join(' '),
                '\x1b(B\x1b[m', sep=''
            );
            const s = captureOutput('gpustat', ...opt);

            console.log(s);
        }

        // Finally, unknown args
        try {
            captureOutput('gpustat', '--unrecognized-args-in-test');
        } catch (e) {
            expect(e).toBeInstanceOf(AssertionError);
        }
    });
});