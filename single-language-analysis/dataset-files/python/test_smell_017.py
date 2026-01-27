import pytest

class TestUnitTest:
    def test_smell_017(self):
        ii = 0
        while ii < 20:
            list.insert_last(ii)
            ii += 1
        assert list.get_count() == 20

        ii = 0
        while not list.is_empty():
            test = list.remove_first()
            assert test == ii
            ii += 1
        assert list.get_count() == 0