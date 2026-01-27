import pytest

class TestGame:
    def test_smell_029(self):
        game = Game(n3win_algorithm, CALCULATION_DEPTH)
        field = [
            [None, None, None, None, None],
            [None, None, None, None, None],
            [None, None, None, None, None],
            [None, None, None, None, None],
            [None, None, None, None, None],
        ]
        
        game.place_chip_in_column(field, 2, Chip.GREEN)
        game.place_chip_in_column(field, 2, Chip.RED)
        game.place_chip_in_column(field, 2, Chip.GREEN)
        game.place_chip_in_column(field, 2, Chip.GREEN)
        game.place_chip_in_column(field, 2, Chip.GREEN)
        
        result = n3win_algorithm.the_winner_is(field)
        assert result == Chip.GREEN

        result = three_win_algorithm.the_winner_is(field)
        assert result == Chip.GREEN