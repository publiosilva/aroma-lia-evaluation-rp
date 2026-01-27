# Original URL: https://github.com/wookayin/gpustat/blob/7a3b9644229681a752b560c6d4889929b9ea39d5/gpustat/test_gpustat.py#L735-L747

class TestGPUStat(object):

    @pytest.mark.skipif(sys.platform == 'win32', reason="Do not run on Windows")
    def test_smell_131(self, scenario_basic, monkeypatch):
        """--color should work well even when executed without TERM,
        e.g. ssh localhost gpustat --color"""
        monkeypatch.setenv("TERM", "")

        s = self.capture_output('gpustat', '--color', '--no-header').rstrip()
        print(s)
        assert remove_ansi_codes(s) == MOCK_EXPECTED_OUTPUT_DEFAULT, \
            "wrong gpustat output"

        assert '\x1b[36m' in s, "should contain cyan color code"
        assert '\x0f' not in s, "Extra \\x0f found (see issue #32)"