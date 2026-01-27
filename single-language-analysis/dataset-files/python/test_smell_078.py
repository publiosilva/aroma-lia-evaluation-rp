import pytest

class TestOoBean:
    def test_smell_078(self):
        f = None
        try:
            f = WriterFrame(100, 100, 500, 400, False, connection.get_component_context())
            f.set_text("OOoBean test.")
            time.sleep(1)
        finally:
            if f is not None:
                f.dispose()