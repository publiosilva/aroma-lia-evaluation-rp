using Xunit;

public class TestSmell069
{
    [Fact]
    public void TestSearchFreeTextDocument()
    {
        string content = "Safe searchable content.";
        clobProcessor.SaveDocument(null, content);
        //wait for the document to be indexed
        System.Threading.Thread.Sleep(5000);
        var results = clobProcessor.SearchFreeTextDocument("contents");
        System.Console.WriteLine(results);
        Assert.False(results.Count == 0);
    }
}