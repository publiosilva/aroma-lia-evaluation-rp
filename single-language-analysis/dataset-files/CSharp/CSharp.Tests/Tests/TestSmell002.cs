using Xunit;
using System.IO;

public class TestSmell002
{
    [Fact]
    public void TestInitialize()
    {
        // Call init method
        Git.Initialize();

        // Checks if index and objects were created
        Assert.True(new FileInfo("index").Exists);
        Assert.True(Directory.Exists("objects"));
    }
}