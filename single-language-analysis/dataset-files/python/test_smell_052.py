import pytest

class TestMarsRover:
    @pytest.mark.skip
    def test_smell_052(self):
        mars_rover = MarsRover("ssssssrsss").turn_right() \
            .move_forward().move_forward().move_forward().turn_right() \
            .move_forward().move_forward().move_forward().move_forward()

        expected_path = "   *   \nX--+--+\n   |  |\n   |  |\n   +--+\n"

        assert mars_rover.path() == expected_path