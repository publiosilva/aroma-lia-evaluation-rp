import pytest

class TestGameTest:
    def test_smell_062(self):
        game = Game(n3win_algorithm, CALCULATION_DEPTH)
        field = [
            [None, None, None, None, None],
            [None, None, None, None, None],
            [None, None, None, None, None],
            [None, None, None, None, None],
            [None, None, None, None, None],
        ]
        result = game.liklihood_to_win(0, field, 1, Chip.GREEN)
        assert 0.40 == pytest.approx(result, rel=0.01)