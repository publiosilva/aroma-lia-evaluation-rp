// Original URL: https://github.com/Code-Connect/TUM_Homework/blob/02f466c543b40c22b76b375f929db2025a8a1e32/src/pgdp16/blatt12/rock/PlayerTest.java#L53-L59

public class TestSmell053 {
    @Test(timeout = 10000)
    @Ignore //optional
    public void interrupt_withoutGetChoice_givenRunning() throws Exception {
        Thread thread = arrangeNewGame();

        assertInterrupt(thread);
    }
}
