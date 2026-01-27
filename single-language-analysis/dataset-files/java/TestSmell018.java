// Original URL: https://github.com/saronson/apcs.java.06.04.Cards/blob/c7e30e11f1bbf4026f80cc30ffd7759c36deb38a/DeckTest.java#L134-L182

public class TestSmell018 {
    @Test
    public void testGame() {

        try
        {
            /*
            Class<?> main = Class.forName("Main");
            Constructor cMain = main.getConstructor();
            Object game = cMain.newInstance();
            Method m = main.getDeclaredMethod("playBlackjack");
             */
            Main game = new Main();
            for (int numPlayers = 2; numPlayers < 10; numPlayers++) {
                int[] winners = new int[numPlayers+1];
                for (int k = 0; k < 1000; k++) {
                    //       Object result = m.invoke(game, j);
                    int result = game.playBlackjack(numPlayers);
                    BlackjackHand[] hands = game.getBlackjackHands();
                    assertTrue("should create hands", hands != null);
                    assertEquals("Should have " + numPlayers + " players", numPlayers, hands.length);
                    int winner = 0;

                    for (int i = 1; i < hands.length; i++) {
                        assertTrue("hand should not be null", hands[i] != null);
                        if (hands[i].getBlackjackValue() > hands[winner].getBlackjackValue())
                            winner = i;
                        else if (hands[i].getBlackjackValue() == hands[winner].getBlackjackValue()) {
                            winner = -1;
                            break;
                        }
                    }
                    assertEquals("wrong winner/tie", winner, result);
                    if (winner == -1)
                      winner = hands.length;
                    winners[winner] += 1;
                }
                for (int i = 0; i < winners.length; i++) {
                    assertTrue("imbalance in winners, was deck shuffled? " + i + " " + winners[i], winners[i]>0);
                }


                //      System.out.println(result);
            }

        }catch (Exception e) {
            failure(e.toString());
        }

    }
}
