import pytest

class TestBeingTest:
    def test_smell_010(self):
        being = TestBeing()
        being.update_time()
        try:
            import time
            time.sleep(0.01)
        except Exception:
            assert False
        elapsed = being.update_time()
        assert elapsed == pytest.approx(1e7, rel=1e6)