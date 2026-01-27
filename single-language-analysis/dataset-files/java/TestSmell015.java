// Original URL: https://github.com/muenchhausen/3wins/blob/57b86a71a57b9a62f811d7d568b11d9d676821fd/GameTest.java#L67-L86

public class TestSmell015 {
    @Test
    public void bot_should_place_a_new_chip ()
    {
        Game game = new Game(n3winAlgorithm,CALCULATION_DEPTH);
        Chip field[][] = new Chip[5][5];

        game.botPlace(field, Chip.RED);
        int counter=0;
        for (int x=0; x<SIZE; x++) {
            for (int y=0; y<SIZE; y++) {
                if(field[x][y]==Chip.RED){
                    counter++;
                }
            }
        }
        assertEquals(1,counter);

        
       
    }
}
