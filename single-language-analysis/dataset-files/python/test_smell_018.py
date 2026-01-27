import pytest

class TestDeckTest:
    def test_smell_018(self):
        try:
            game = Main()
            for num_players in range(2, 10):
                winners = [0] * (num_players + 1)
                for k in range(1000):
                    result = game.play_blackjack(num_players)
                    hands = game.get_blackjack_hands()
                    assert hands is not None, "should create hands"
                    assert num_players == len(hands), "Should have " + str(num_players) + " players"
                    winner = 0

                    for i in range(1, len(hands)):
                        assert hands[i] is not None, "hand should not be null"
                        if hands[i].get_blackjack_value() > hands[winner].get_blackjack_value():
                            winner = i
                        elif hands[i].get_blackjack_value() == hands[winner].get_blackjack_value():
                            winner = -1
                            break
                    assert winner == result, "wrong winner/tie"
                    if winner == -1:
                        winner = len(hands)
                    winners[winner] += 1
                for i in range(len(winners)):
                    assert winners[i] > 0, "imbalance in winners, was deck shuffled? " + str(i) + " " + str(winners[i])
        except Exception as e:
            assert False, str(e)