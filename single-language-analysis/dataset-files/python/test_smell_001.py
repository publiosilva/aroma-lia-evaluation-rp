import pytest

class TestUnitTest:
    def test_smell_001(self):
        locations = FileIO.read_location_file("location.csv")

        assert locations.peek_first().get_name() == "Perth"

        map = FileIO.read_distance_file("distances.csv", locations)

        assert locations.get_count() == 14
        assert map.get_node_count() == 11
        assert map.get_edge_count() == 62

        temp = map.get_edges().peek_first().find_weight("walk").get_length()
        assert temp == pytest.approx(13.1, rel=0.0001)

        temp1 = map.get_edges().peek_first().find_weight("car").get_pk_time()
        assert temp1 == 24