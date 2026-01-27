import pytest

class TestMarsRover:
    @pytest.mark.skip
    def test_smell_066(self):
        expected_path = "    *\n" \
                        "    |\n" \
                        "    |\n" \
                        "    |\n" \
                        "X---+\n"
        print(expected_path)
        assert MarsRover("sssslssss").path() == expected_path