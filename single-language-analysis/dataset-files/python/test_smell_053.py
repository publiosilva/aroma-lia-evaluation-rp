import pytest

class TestPlayerTest:
    @pytest.mark.skip
    def test_smell_053(self):
        thread = self.arrange_new_game()

        self.assert_interrupt(thread)

    def arrange_new_game(self):
        pass

    def assert_interrupt(self, thread):
        pass