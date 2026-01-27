import pytest

class TestOoBeanTest:
    def test_smell_019(self):
        f = None
        try:
            f = WriterFrame(100, 100, 500, 300, False, connection.get_component_context())
            b = f.get_bean()
            for i in range(100):
                b.release_system_window()
                b.aquire_system_window()
            assert f.check_uno_frame_position()
        except AssertionError:
            assert False, "Sizing error."
        finally:
            if f is not None:
                f.dispose()
            if not is_windows():
                time.sleep(10)