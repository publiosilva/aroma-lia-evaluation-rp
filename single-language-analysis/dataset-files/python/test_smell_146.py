# Original URL: https://github.com/wookayin/gpustat/blob/7a3b9644229681a752b560c6d4889929b9ea39d5/gpustat/test_gpustat.py#L526-L554

class TestGPUStat(object):

    @pytest.mark.parametrize("nvidia_driver_version",
                             NvidiaDriverMock.INSTANCES, indirect=True)
    def test_smell_146(self, scenario_basic, nvidia_driver_version):
        """A basic functionality test, in a case where everything is normal."""

        gpustats = gpustat.new_query()
        fp = StringIO()
        gpustats.print_formatted(
            fp=fp, no_color=False, show_user=True,
            show_cmd=True, show_full_cmd=True, show_pid=True,
            show_fan_speed=True, show_codec="enc,dec", show_power=True,
        )

        result = fp.getvalue()
        print(result)

        unescaped = remove_ansi_codes(result)
        # remove first line (header)
        unescaped = os.linesep.join(unescaped.splitlines()[1:])

        assert unescaped == MOCK_EXPECTED_OUTPUT_FULL_PROCESS

        # verify gpustat results (not exhaustive yet)
        assert gpustats.driver_version == nvidia_driver_version.name
        g: gpustat.GPUStat = gpustats.gpus[0]
        assert g.memory_used == 8000
        assert g.power_draw == 125
        assert g.utilization == 76
        assert g.processes and g.processes[0]['pid'] == 48448