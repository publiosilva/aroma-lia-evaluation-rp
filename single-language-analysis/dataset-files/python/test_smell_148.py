# Original URL: https://github.com/wookayin/gpustat/blob/7a3b9644229681a752b560c6d4889929b9ea39d5/gpustat/test_gpustat.py#L556-L573

class TestGPUStat(object):

    def test_smell_148(self, scenario_nonexistent_pid):
        """
        Test a case where nvidia query returns non-existent pids (see #16, #18)
        for GPU index 2.
        """
        fp = StringIO()

        gpustats = gpustat.new_query()
        gpustats.print_formatted(fp=fp)

        ret = fp.getvalue()
        print(ret)

        # gpu 2: should ignore process id
        line = remove_ansi_codes(ret).split('\n')[3]
        assert '[2] GeForce RTX 2' in line, str(line)
        assert '99999' not in line
        assert '(Not Supported)' not in line