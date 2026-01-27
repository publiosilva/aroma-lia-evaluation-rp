import pytest

class TestBeingTest:
    def test_smell_058(self):
        being = TestBeing()    
        being.set_velocity(make_vector(0.5, 0.0, 0.0))
        being.update_time()
        try:
            time.sleep(1)
        except Exception:
            assert False
        being.step()
        assert 0.5 == pytest.approx(being.get_position().x, rel=1e-2)
        assert 0.0 == pytest.approx(being.get_position().y, rel=1e-2) 
        assert 0.0 == pytest.approx(being.get_position().z, rel=1e-2)