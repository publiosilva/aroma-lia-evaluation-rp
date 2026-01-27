using Xunit;

public class TestSmell150
{
    [Fact]
    public void TestNewQueryMockedFailingOneGpu()
    {
        var scenarioFailingOneGpu = GetScenarioFailingOneGpu();
        var fp = new StringWriter();
        var gpustats = GPUSStat.NewQuery();
        gpustats.PrintFormatted(fp: fp, showHeader: false);
        var ret = fp.GetStringBuilder().ToString();
        Console.WriteLine(ret);

        var lines = RemoveAnsiCodes(ret).Split('\n');
        var message = scenarioFailingOneGpu["expected_message"];

        // gpu 2: failing due to unknown error
        var line = lines[2];
        Assert.Contains($"[2] (({message}))", line);
        Assert.DoesNotContain("99999", line);
        Assert.Contains("??°C,  ?? %", line);
        Assert.Contains("?? /    ?? MB", line);

        // other gpus should be displayed normally
        Assert.Contains("[0] GeForce GTX TITAN 0", lines[0]);
        Assert.Contains("[1] GeForce GTX TITAN 1", lines[1]);
    }

    private Dictionary<string, string> GetScenarioFailingOneGpu()
    {
        // Implementation to retrieve the scenario failing one GPU
    }

    private string RemoveAnsiCodes(string input)
    {
        // Implementation to remove ANSI codes from the input string
    }
}