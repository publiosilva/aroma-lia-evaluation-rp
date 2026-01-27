import pytest

class TestCarTest:
    def test_smell_060(self):
        volvo240 = Volvo240(0, 0)
        volvo240.start_engine()
        volvo240.decrement_speed(0.01)
        delta = 0.0001
        assert 0.0875 == pytest.approx(volvo240.get_current_speed(), rel=delta)