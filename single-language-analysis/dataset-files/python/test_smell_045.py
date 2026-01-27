import pytest

class TestClassname:
    def test_smell_045(self):
        being = TestBeing()    
        being.set_velocity(make_vector(0.5, 0.0, 0.0))
        being.update_time()
        try:
            time.sleep(1)
        except Exception:
            assert False
        being.process_update()
        assert being.get_position().x == pytest.approx(0.5, rel=1e-2)
        assert being.get_position().y == pytest.approx(0.0, rel=1e-2)
        assert being.get_position().z == pytest.approx(0.0, rel=1e-2)