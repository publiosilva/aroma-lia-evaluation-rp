using Xunit;

public class TestSmell075
{
    [Fact]
    public void TestSearchFreeTextDocument2()
    {
        string searchTerm = "content";
        clobProcessor.SaveDocument(null, "This is a test content.");
        //wait for the document to be indexed
        System.Threading.Thread.Sleep(5000);
        var results = clobProcessor.SearchContainDocument(searchTerm);
        System.Console.WriteLine(results);
        Assert.False(results.Count == 0);
    }
}