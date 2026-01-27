using Xunit;

public class TestSmell025
{
    [Fact]
    public void TestMove()
    {
        Game g = new Game(false);
        Board b = g.GetMyBoard();
        Assert.NotNull(b);
        try
        {
            b.MakeStartingBoard();
            Assert.NotNull(b);
        }
        catch (Exception e)
        {
            Assert.True(false, e.ToString());
        }

        g.SetCurrentPlayer(aiColor);
        b.MyDice.Roll(1, 1);
        Assert.Equal(4, b.MyDice.GetDoubletMovesCountdown());

        StartGameStrategy sg = new StartGameStrategy();
        Move best = sg.PickBestMove(b, aiColor);
        System.Console.WriteLine(best);
        Assert.True(best.IsPossible());
        List<PartialMove> partials = best.GetMyPartials();
        Assert.Equal(4, partials.Count);

        best.DoMove();
        Assert.Equal(0, b.MyDice.GetDoubletMovesCountdown());
    }
}