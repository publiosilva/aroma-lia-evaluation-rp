using Xunit;

public class TestSmell018
{
    [Fact]
    public void TestGame()
    {
        try
        {
            Main game = new Main();
            for (int numPlayers = 2; numPlayers < 10; numPlayers++)
            {
                int[] winners = new int[numPlayers + 1];
                for (int k = 0; k < 1000; k++)
                {
                    int result = game.PlayBlackjack(numPlayers);
                    BlackjackHand[] hands = game.GetBlackjackHands();
                    Assert.True(hands != null, "should create hands");
                    Assert.Equal(numPlayers, hands.Length);
                    int winner = 0;

                    for (int i = 1; i < hands.Length; i++)
                    {
                        Assert.True(hands[i] != null, "hand should not be null");
                        if (hands[i].GetBlackjackValue() > hands[winner].GetBlackjackValue())
                            winner = i;
                        else if (hands[i].GetBlackjackValue() == hands[winner].GetBlackjackValue())
                        {
                            winner = -1;
                            break;
                        }
                    }
                    Assert.Equal(winner, result);
                    if (winner == -1)
                        winner = hands.Length;
                    winners[winner] += 1;
                }
                for (int i = 0; i < winners.Length; i++)
                {
                    Assert.True(winners[i] > 0, "imbalance in winners, was deck shuffled? " + i + " " + winners[i]);
                }
            }
        }
        catch (System.Exception e)
        {
            Assert.True(false, e.ToString());
        }
    }
}