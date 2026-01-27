// Original URL: https://github.com/INFO-ESIPE/TP-Programmation_Concurrente/blob/48457a69d6f38d906dda5d47965b1e91bbcb3194/TP%204/src/VoteTest.java#L53-L67

public class TestSmell071 {
    @Test
    public void ManyVotes() throws Exception {
        var vote = new Vote(2);
        for(var i = 0; i < 4; i++) {
            Thread.ofPlatform().start(() -> {
                try {
                    Thread.sleep(1_000);
                    assertEquals("0", vote.vote("1"));
                } catch (InterruptedException e) {
                    throw new AssertionError(e);
                }
            });
        }
        assertEquals("0", vote.vote("0"));
    }
}
