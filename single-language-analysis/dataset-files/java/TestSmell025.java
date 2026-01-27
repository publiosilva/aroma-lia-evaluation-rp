// Original URL: https://github.com/backgammon-java-ai/backg_java2012/blob/ca26b37a9a649d3ed5eb97cfceb9e5719b269bb7/MoveTest.java#L49-L78

public class TestSmell025 {
    @Test
    public void testMove() {
        /* old test, not working anymore, maybe it needs specific board
           probably has issue with the game needing a first roll of dice
           to choose a currentPlayer */
        g = new Game(false);
        b = g.getMyBoard( );
        assertNotNull(b);
        try {
            b.makeStartingBoard( );/* regular game */
            assertNotNull(b);
        } catch(Exception e) {
            /* isn't there a way to test without catching exceptions? */
            fail(e.toString( ));
        }

        g.setCurrentPlayer(aiColor);
        b.myDice.roll(1,1); /* alternative syntax:b1.myDice.roll(1,2) */
        assertEquals(4, b.myDice.getDoubletMovesCountdown( ) );

        StartGameStrategy sg = new StartGameStrategy( );
        Move best = sg.pickBestMove(b,aiColor);
        System.out.println(best);
        assertTrue( best.isPossible( ) );
        ArrayList<PartialMove> partials = best.getMyPartials();
        assertEquals(4, partials.size( ) );

        best.doMove( );
        assertEquals(0, b.myDice.getDoubletMovesCountdown( ) );
    } /* testMove( ) */
}
