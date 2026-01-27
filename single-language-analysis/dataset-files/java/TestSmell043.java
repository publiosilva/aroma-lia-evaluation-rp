// Original URL: https://github.com/INFO-ESIPE/TP-Programmation_Concurrente/blob/48457a69d6f38d906dda5d47965b1e91bbcb3194/TP%204/src/VoteTest.java#L8-L28

public class TestSmell043 {
    @Test
    public void SimpleVote() throws Exception {
        var vote = new Vote(3);
        Thread.ofPlatform().start(() -> {
            try {
                Thread.sleep(1_000);
                assertEquals("0", vote.vote("1"));
            } catch (InterruptedException e) {
                throw new AssertionError(e);
            }
        });
        Thread.ofPlatform().start(() -> {
            try {
                Thread.sleep(500);
                assertEquals("0", vote.vote("0"));
            } catch (InterruptedException e) {
                throw new AssertionError(e);
            }
        });
        assertEquals("0", vote.vote("0"));
    }
}
