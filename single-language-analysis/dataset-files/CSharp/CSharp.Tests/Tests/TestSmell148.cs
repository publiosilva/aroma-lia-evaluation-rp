using Xunit;

public class TestSmell148
{
    [Fact]
    public void TestNewQueryMockedNonexistentPid()
    {
        var fp = new System.IO.StringWriter();

        var gpustats = gpustat.NewQuery();
        gpustats.PrintFormatted(fp: fp);

        var ret = fp.GetStringBuilder().ToString();
        System.Console.WriteLine(ret);

        var line = RemoveAnsiCodes(ret).Split('\n')[3];
        Assert.Contains("[2] GeForce RTX 2", line);
        Assert.DoesNotContain("99999", line);
        Assert.DoesNotContain("(Not Supported)", line);
    }

    private string RemoveAnsiCodes(string input)
    {
        // Implementation of RemoveAnsiCodes
        return input; // Placeholder
    }
}