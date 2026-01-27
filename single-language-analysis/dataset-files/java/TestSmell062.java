// Original URL: https://github.com/muenchhausen/3wins/blob/57b86a71a57b9a62f811d7d568b11d9d676821fd/GameTest.java#L394-L402

public class TestSmell062 {
    @Test
    public void liklihood_to_win_should_return_0_58_in_the_left_column_in_a_5x5_playground()
    {
        Game game = new Game(n3winAlgorithm,CALCULATION_DEPTH);
        Chip field[][] = new Chip[5][5];
        double result=game.liklihoodToWin(0, field,1,Chip.GREEN);
        assertEquals (0.40,result,0.01);
        
    }
}
