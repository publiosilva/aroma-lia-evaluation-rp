import pytest

class TestCellTest:
    def test_smell_064(self):
        assert 0.0 == pytest.approx(Cell.calculate_mean([]), rel=0.001), "Mean of empty list should be 0.0"
        assert 0.0 == pytest.approx(Cell.calculate_mean(None), rel=0.001), "Mean of null should be 0.0"
        assert 2.0 == pytest.approx(Cell.calculate_mean([1.0, 2.0, 3.0]), rel=0.001), "Mean of test numbers should be 2.0"
