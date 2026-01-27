using Xunit;

public class TestSmell029
{
    [Fact]
    public void Check_Winner_Should_Return_GREEN_If_3_GREEN_Are_On_The_Top()
    {
        Game game = new Game(n3winAlgorithm, CALCULATION_DEPTH);
        Chip[,] field = new Chip[5, 5];

        game.PlaceChipInColumn(field, 2, Chip.GREEN);
        game.PlaceChipInColumn(field, 2, Chip.RED);
        game.PlaceChipInColumn(field, 2, Chip.GREEN);
        game.PlaceChipInColumn(field, 2, Chip.GREEN);
        game.PlaceChipInColumn(field, 2, Chip.GREEN);
        Chip result = n3winAlgorithm.TheWinnerIs(field);
        Assert.Equal(result, Chip.GREEN);

        result = threeWinAlgorithm.TheWinnerIs(field);
        Assert.Equal(result, Chip.GREEN);
    }
}