# Original URL: https://github.com/wookayin/gpustat/blob/7a3b9644229681a752b560c6d4889929b9ea39d5/gpustat/test_gpustat.py#L575-L599

class TestGPUStat(object):

    @pytest.mark.parametrize("scenario_failing_one_gpu", [
        pynvml.NVMLError_GpuIsLost,
        pynvml.NVMLError_Unknown,
    ], indirect=True)
    def test_smell_150(self, scenario_failing_one_gpu):
        """Test a case where one GPU is failing (see #125)."""
        fp = StringIO()
        gpustats = gpustat.new_query()
        gpustats.print_formatted(fp=fp, show_header=False)
        ret = fp.getvalue()
        print(ret)

        lines = remove_ansi_codes(ret).split('\n')
        message = scenario_failing_one_gpu['expected_message']

        # gpu 2: failing due to unknown error
        line = lines[2]
        assert '[2] ((' + message + '))' in line, str(line)
        assert '99999' not in line
        assert '??°C,  ?? %' in line, str(line)
        assert '?? /    ?? MB' in line, str(line)

        # other gpus should be displayed normally
        assert '[0] GeForce GTX TITAN 0' in lines[0]
        assert '[1] GeForce GTX TITAN 1' in lines[1]