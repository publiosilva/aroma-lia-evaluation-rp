using Xunit;

public class TestSmell161
{
    [Fact]
    public void TestMain()
    {
        string[] args = { "gpustat" };
        System.Environment.SetCommandLineArgs(args);
        gpustat.Main();
    }
}