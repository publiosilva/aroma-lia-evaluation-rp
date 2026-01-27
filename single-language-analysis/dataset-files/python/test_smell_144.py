# Original URL: https://github.com/wookayin/gpustat/blob/7a3b9644229681a752b560c6d4889929b9ea39d5/gpustat/test_gpustat.py#L630-L667

class TestGPUStat(object):

    def test_smell_144(self, scenario_basic):
        """Tests the end gpustat CLI."""
        capture_output = self.capture_output

        def _remove_ansi_codes_and_header_line(s):
            unescaped = remove_ansi_codes(s)
            # remove first line (header)
            unescaped = os.linesep.join(unescaped.splitlines()[1:])
            return unescaped

        s = capture_output('gpustat', )
        assert _remove_ansi_codes_and_header_line(s) == MOCK_EXPECTED_OUTPUT_DEFAULT

        s = capture_output('gpustat', '--version')
        assert s.startswith('gpustat ')
        print(s)

        s = capture_output('gpustat', '--no-header')
        assert "[0]" in s.splitlines()[0]

        s = capture_output('gpustat', '-a')  # --show-all
        assert _remove_ansi_codes_and_header_line(s) == MOCK_EXPECTED_OUTPUT_FULL

        s = capture_output('gpustat', '--color')
        assert '\x0f' not in s, "Extra \\x0f found (see issue #32)"
        assert _remove_ansi_codes_and_header_line(s) == MOCK_EXPECTED_OUTPUT_DEFAULT

        s = capture_output('gpustat', '--no-color')
        unescaped = remove_ansi_codes(s)
        assert s == unescaped   # should have no ansi code
        assert _remove_ansi_codes_and_header_line(s) == MOCK_EXPECTED_OUTPUT_DEFAULT

        s = capture_output('gpustat', '--no-processes')
        assert _remove_ansi_codes_and_header_line(s) == MOCK_EXPECTED_OUTPUT_NO_PROCESSES

        s = capture_output('gpustat', '--id', '1,2')
        assert _remove_ansi_codes_and_header_line(s) == \
            os.linesep.join(MOCK_EXPECTED_OUTPUT_DEFAULT.splitlines()[1:3])