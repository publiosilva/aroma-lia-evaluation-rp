# Original URL: https://github.com/wookayin/gpustat/blob/7a3b9644229681a752b560c6d4889929b9ea39d5/gpustat/test_gpustat.py#L623-L628

class TestGPUStat(object):

    def test_smell_161(self, scenario_basic):
        """Test whether gpustat.main() works well.
        The behavior is mocked exactly as in test_new_query_mocked().
        """
        sys.argv = ['gpustat']
        gpustat.main()