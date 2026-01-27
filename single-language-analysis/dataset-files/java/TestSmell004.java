// Original URL: https://github.com/Glacier173/wgit-project/blob/8820c845d359331793302eed996b34d9c2b017f4/GitTest.java#L43-L60

public class TestSmell004 {
    @Test
    void testWriteToIndex() throws Exception {
        Git g = new Git ();
        g.initialize();
        g.addBlob("a.txt");
        g.writeToIndex();
        BufferedReader reader = new BufferedReader(new FileReader("index"));
            String line;
            HashMap<String, String> hm = g.hm;
            while ((line = reader.readLine()) != null) {
                String[] parts = line.split(" : ");
                assertEquals(2, parts.length);
                String fileName = parts[0];
                String hash = parts[1];
                assertTrue(hm.containsKey(fileName));
                assertEquals(hm.get(fileName), hash);
            }
    }
}
