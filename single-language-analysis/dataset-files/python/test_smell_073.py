import pytest

class TestOoBean:
    def test_smell_073(self):
        f = None
        capturer = None
        try:
            f = WriterFrame(100, 100, 500, 500, False, connection.get_component_context())
            assert f.check_uno_frame_position(), "Sizing error: Client area of Java frame does not match the UNO window."
            capturer = ScreenComparer(100, 100, 500, 500)

            # Minimize Window and back
            f.go_to_start()
            f.page_down()
            time.sleep(1)
            for i in range(3):
                capturer.reset()
                capturer.grab_one(f.get_client_area())
                f.set_extended_state(Frame.ICONIFIED)
                time.sleep(get_sleep_time(200))
                assert f.check_uno_frame_position(), "Sizing error: Frame was iconified."
                f.set_extended_state(Frame.NORMAL)
                time.sleep(get_sleep_time(200))
                assert f.check_uno_frame_position(), "Sizing error: Frame size set back to normal after it was iconified."
                capturer.grab_two(f.get_client_area())
                assert capturer.compare(), "Painting error: Minimize (iconify) frame and back to normal size."
                capturer.write_images()

            # Maximize Window and back to normal
            for i in range(3):
                capturer.reset()
                capturer.grab_one(f.get_client_area())
                f.set_extended_state(Frame.MAXIMIZED_BOTH)
                time.sleep(get_sleep_time(200))
                assert f.check_uno_frame_position(), "Sizing error: Frame maximized."
                f.set_extended_state(Frame.NORMAL)
                time.sleep(get_sleep_time(200))
                assert f.check_uno_frame_position(), "Sizing error: Frame set from maximized to normal."
                capturer.grab_two(f.get_client_area())
                assert capturer.compare(), "Painting error: Maximize frame and back to normal size"
                capturer.write_images()

            # move Window top left
            capturer.reset()
            capturer.grab_one(f.get_client_area())
            old_position = f.get_bounds()
            f.set_bounds(0, 0, old_position.width, old_position.height)
            time.sleep(get_sleep_time(200))
            assert f.check_uno_frame_position(), "Sizing error: Frame moved."

            capturer.grab_two(f.get_client_area())
            assert capturer.compare(), "Painting error: Move frame to a different position."
            capturer.write_images()

            # move Window down
            dim = Toolkit.get_default_toolkit().get_screen_size()
            max_y = dim.height - f.get_bounds().height

            cur_y = 0
            while cur_y < max_y:
                capturer.reset()
                capturer.grab_one(f.get_client_area())
                old_position = f.get_bounds()
                f.set_bounds(0, cur_y, old_position.width, old_position.height)
                capturer.grab_two(f.get_client_area())
                assert capturer.compare(), "Painting error: Move frame to a different position."
                capturer.write_images()
                cur_y += 50
                time.sleep(get_sleep_time(200))

            # obscure the window and make it visible again
            old_position = f.get_bounds()

            pos = Rectangle(old_position.x - 50, old_position.y - 50,
                            old_position.width, old_position.height)
            cover_frame = Frame()
            cover_frame.set_bounds(pos)
            capturer.reset()
            capturer.grab_one(f.get_client_area())

            for i in range(3):
                cover_frame.set_visible(True)
                time.sleep(get_sleep_time(200))
                f.to_front()
                time.sleep(get_sleep_time(200))
                assert f.check_uno_frame_position(), "Sizing error: Frame moved from back to front."

                capturer.grab_two(f.get_client_area())
                assert capturer.compare(), "Painting error: Move frame to back and to front."
                capturer.write_images()

            cover_frame.dispose()
        finally:
            if f is not None:
                f.dispose()