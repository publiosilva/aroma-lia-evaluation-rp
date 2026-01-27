using Xunit;

public class TestSmell146
{
    [Fact]
    public void TestNewQueryMockedBasic()
    {
        var nvidiaDriverVersion = NvidiaDriverMock.INSTANCES; // Assuming this is set up correctly
        var scenarioBasic = new object(); // Assuming this is set up correctly

        var gpustats = gpustat.NewQuery();
        var fp = new StringWriter();
        gpustats.PrintFormatted(
            fp: fp, noColor: false, showUser: true,
            showCmd: true, showFullCmd: true, showPid: true,
            showFanSpeed: true, showCodec: "enc,dec", showPower: true
        );

        var result = fp.GetStringBuilder().ToString();
        Console.WriteLine(result);

        var unescaped = RemoveAnsiCodes(result);
        unescaped = string.Join(Environment.NewLine, unescaped.Split(new[] { Environment.NewLine }, StringSplitOptions.None).Skip(1));

        Assert.Equal(MOCK_EXPECTED_OUTPUT_FULL_PROCESS, unescaped);

        Assert.Equal(nvidiaDriverVersion.Name, gpustats.DriverVersion);
        var g = gpustats.Gpus[0];
        Assert.Equal(8000, g.MemoryUsed);
        Assert.Equal(125, g.PowerDraw);
        Assert.Equal(76, g.Utilization);
        Assert.True(g.Processes != null && g.Processes[0]["pid"].Equals(48448));
    }
}