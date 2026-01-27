// Original URL: https://github.com/muenchhausen/3wins/blob/57b86a71a57b9a62f811d7d568b11d9d676821fd/GameTest.java#L190-L206

public class TestSmell029 {
    @Test
    public void check_winner_should_return_GREEN_if_3_GREEN_are_on_the_top()
    {
        Game game = new Game(n3winAlgorithm,CALCULATION_DEPTH);
        Chip field[][] = new Chip[5][5];
        
        game.placeChipInColumn(field, 2,Chip.GREEN);
        game.placeChipInColumn(field, 2,Chip.RED);
        game.placeChipInColumn(field, 2,Chip.GREEN);
        game.placeChipInColumn(field, 2,Chip.GREEN);
        game.placeChipInColumn(field, 2,Chip.GREEN);
        Chip result= n3winAlgorithm.theWinnerIs(field);
        assertEquals(Chip.GREEN,result);

        result = threeWinAlgorithm.theWinnerIs(field);
        assertEquals(Chip.GREEN,result);
    }
}
