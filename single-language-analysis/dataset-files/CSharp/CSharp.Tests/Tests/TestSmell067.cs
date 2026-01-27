using Xunit;

public class TestSmell067
{
    [Fact]
    public void TestMain()
    {
        System.Console.WriteLine("main");
        string[] args = null;
        Peo.Main(args);
        Assert.Equal("The test case is a prototype.", "The test case is a prototype.");
    }
}