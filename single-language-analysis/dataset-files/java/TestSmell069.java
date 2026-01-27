// Original URL: https://github.com/skolanko222/CLOBprocessor/blob/19097d5f286ba78e3431883826c0ef734facdd53/src/ClobProcessorTest.java#L86-L95

public class TestSmell069 {
    @Test
    public void testSearchFreeTextDocument() throws SQLException, InterruptedException {
        String content = "Safe searchable content.";
        clobProcessor.saveDocument(null, content);
        //wait for the document to be indexed
        Thread.sleep(5000);
        ArrayList<String> results = clobProcessor.searchFreeTextDocument("contents");
        System.out.println(results);
        assertFalse(results.isEmpty());
    }
}
