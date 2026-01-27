import pytest

class TestOOoBean:
    def test_smell_048(self):
        f = None
        try:
            f = WriterFrame(100, 100, 500, 400, False, connection.get_component_context())
            f.go_to_start()
            f.page_down()
            time.sleep(1)

            capturer = ScreenComparer(100, 100, 500, 400)
            capturer.grab_one()
            for i in range(100):
                f.remove_o_o_bean()
                f.add_o_o_bean()

            f.go_to_start()
            f.page_down()
            time.sleep(get_sleep_time(200))
            capturer.grab_two()

            if not capturer.compare():
                pytest.fail("Painting error: adding and removing OOoBean repeatedly to java.lang.Frame.")
                capturer.write_images()

            if not f.check_uno_frame_position():
                pytest.fail("Sizing error.")

        finally:
            if f is not None:
                f.dispose()
            if not is_windows():
                time.sleep(10)