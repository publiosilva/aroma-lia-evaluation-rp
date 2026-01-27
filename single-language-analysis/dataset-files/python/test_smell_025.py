import pytest

class TestMovetest:
    def test_smell_025(self):
        g = Game(False)
        b = g.get_my_board()
        assert b is not None
        try:
            b.make_starting_board()
            assert b is not None
        except Exception as e:
            pytest.fail(str(e))

        g.set_current_player(ai_color)
        b.my_dice.roll(1, 1)
        assert b.my_dice.get_doublet_moves_countdown() == 4

        sg = StartGameStrategy()
        best = sg.pick_best_move(b, ai_color)
        print(best)
        assert best.is_possible()
        partials = best.get_my_partials()
        assert len(partials) == 4

        best.do_move()
        assert b.my_dice.get_doublet_moves_countdown() == 0