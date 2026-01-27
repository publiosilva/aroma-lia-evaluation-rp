import pytest

class TestLoopTest:
    def test_smell_005(self):
        assert "1223334444" == loop_obj.loop(4)
        assert "1" == loop_obj.loop(1)
        assert "122333" == loop_obj.loop(3)