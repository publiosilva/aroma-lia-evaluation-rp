import pytest

class TestGameTest:
    def test_smell_015(self):
        game = Game(n3win_algorithm, CALCULATION_DEPTH)
        field = [[None for _ in range(5)] for _ in range(5)]

        game.bot_place(field, Chip.RED)
        counter = 0
        for x in range(SIZE):
            for y in range(SIZE):
                if field[x][y] == Chip.RED:
                    counter += 1
        assert counter == 1