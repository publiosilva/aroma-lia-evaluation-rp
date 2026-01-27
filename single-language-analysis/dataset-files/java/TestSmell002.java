// Original URL: https://github.com/Glacier173/Git/blob/7fcb4dae0f2c2e9a9d5a931a15398d59462f4195/GitTest.java#L25-L34

public class TestSmell002 {
    @Test
    void testInitialize() throws IOException {

        // Call init method
        Git.initialize();

        // Checks if index  and objects were created
        assertTrue(new File("index").isFile());
        assertTrue(new File("objects").isDirectory());
    }
}
