import pytest

class TestApp:
    def test_smell_061(self):
        assert 30 == App.find_max([1, 2, 30, 4])