// Original URL: https://github.com/skolanko222/CLOBprocessor/blob/19097d5f286ba78e3431883826c0ef734facdd53/src/ClobProcessorTest.java#L96-L105

public class TestSmell075 {
    @Test
    public void testSearchFreeTextDocument2() throws SQLException, InterruptedException {
        String searchTerm = "content";
        clobProcessor.saveDocument(null, "This is a test content.");
        //wait for the document to be indexed
        Thread.sleep(5000);
        ArrayList<String> results = clobProcessor.searchContainDocument(searchTerm);
        System.out.println(results);
        assertFalse(results.isEmpty());
    }
}
