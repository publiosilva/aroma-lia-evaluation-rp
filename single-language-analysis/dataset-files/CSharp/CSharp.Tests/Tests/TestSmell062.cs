using Xunit;

public class TestSmell062
{
    [Fact]
    public void Liklihood_To_Win_Should_Return_0_58_In_The_Left_Column_In_A_5x5_Playground()
    {
        Game game = new Game(n3winAlgorithm, CALCULATION_DEPTH);
        Chip[,] field = new Chip[5, 5];
        double result = game.LiklihoodToWin(0, field, 1, Chip.GREEN);
        Assert.Equal(0.40, result, 0.01);
    }
}