using Xunit;

public class TestSmell124
{
    [Fact]
    public void TestEmptyInvalidWSDL()
    {
        var locals = new System.Collections.Generic.Dictionary<string, object>();
        locals.Remove("e");

        System.Exception e = null;
        try
        {
            e = Assert.Throws<xml.sax.SAXParseException>(() => TestUtils.ClientFromWsdl(
                new byte[] { }));
            Assert.Equal("no element found", e.Message);
        }
        finally
        {
            e = null; // explicitly break circular reference chain
        }
    }
}