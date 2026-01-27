# Original URL: https://github.com/wookayin/gpustat/blob/7a3b9644229681a752b560c6d4889929b9ea39d5/gpustat/test_gpustat.py#L601-L621

class TestGPUStat(object):

    def test_smell_086(self, scenario_basic):
        """Test whether each property of `GPUStat` instance is well-defined."""

        g = gpustat.new_query()[1]  # includes N/A
        print("(keys) : %s" % str(g.keys()))
        print(g)

        assert g['name'] == g.entry['name']
        assert g['uuid'] == g.uuid

        with pytest.raises(KeyError):
            g['unknown_key']

        print("uuid : %s" % g.uuid)
        print("name : %s" % g.name)
        print("memory : used %d total %d avail %d" % (
            g.memory_used, g.memory_total, g.memory_available))
        print("temperature : %d" % (g.temperature))
        print("utilization : %s" % (g.utilization))
        print("utilization_enc : %s" % (g.utilization_enc))
        print("utilization_dec : %s" % (g.utilization_dec))