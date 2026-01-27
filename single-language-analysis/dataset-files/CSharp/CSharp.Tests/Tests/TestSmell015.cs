using Xunit;

public class TestSmell015
{
    [Fact]
    public void Bot_Should_Place_A_New_Chip()
    {
        Game game = new Game(n3winAlgorithm, CALCULATION_DEPTH);
        Chip[,] field = new Chip[5, 5];

        game.BotPlace(field, Chip.RED);
        int counter = 0;
        for (int x = 0; x < SIZE; x++)
        {
            for (int y = 0; y < SIZE; y++)
            {
                if (field[x, y] == Chip.RED)
                {
                    counter++;
                }
            }
        }
        Assert.Equal(1, counter);
    }
}