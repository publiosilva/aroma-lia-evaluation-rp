# Original URL: https://github.com/wookayin/gpustat/blob/7a3b9644229681a752b560c6d4889929b9ea39d5/gpustat/test_gpustat.py#L707-L733

class TestGPUStat(object):

    def test_smell_103(self, scenario_basic):
        """Tests gpustat CLI with a variety of --show-xxx options. """

        capture_output = self.capture_output
        print('')

        TEST_OPTS = []
        TEST_OPTS += ['-a', '-c', '-u', '-p', '-e', '-P', '-f']
        TEST_OPTS += [('-e', ''), ('-P', '')]
        TEST_OPTS += [('-e', 'enc,dec'), '-Plimit,draw']
        TEST_OPTS += ['-cup', '-cpu', '-cufP']  # 'cpuePf'

        for opt in TEST_OPTS:
            if isinstance(opt, str):
                opt = [opt]

            print('\x1b[30m\x1b[43m',  # black_on_yellow
                  '$ gpustat ' + ' '.join(shlex.quote(o) for o in opt),
                  '\x1b(B\x1b[m', sep='')
            s = capture_output('gpustat', *opt)

            # TODO: Validate output without hardcoding expected outputs
            print(s)

        # Finally, unknown args
        with pytest.raises(AssertionError):
            capture_output('gpustat', '--unrecognized-args-in-test')