// Original URL: https://github.com/RachanSaini/java-testing-p1/blob/a41fdfa0c6ac3c2567ff44fbe5a57c41351ad8fd/LoopTest.java#L23-L28

public class TestSmell005 {
    @Test
    public void loop() {
        assertEquals("1223334444",loopObj.loop(4));
        assertEquals("1",loopObj.loop(1));
        assertEquals("122333",loopObj.loop(3));
    }
}
