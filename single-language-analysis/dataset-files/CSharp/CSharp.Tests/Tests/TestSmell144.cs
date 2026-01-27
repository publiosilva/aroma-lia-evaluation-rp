using Xunit;

public class TestSmell144
{
    [Fact]
    public void TestArgsCommandline()
    {
        var captureOutput = CaptureOutput;

        string RemoveAnsiCodesAndHeaderLine(string s)
        {
            var unescaped = RemoveAnsiCodes(s);
            unescaped = string.Join(System.Environment.NewLine, unescaped.Split(new[] { System.Environment.NewLine }, StringSplitOptions.None).Skip(1));
            return unescaped;
        }

        var s = captureOutput("gpustat");
        Assert.Equal(MOCK_EXPECTED_OUTPUT_DEFAULT, RemoveAnsiCodesAndHeaderLine(s));

        s = captureOutput("gpustat", "--version");
        Assert.True(s.StartsWith("gpustat "));
        System.Console.WriteLine(s);

        s = captureOutput("gpustat", "--no-header");
        Assert.Contains("[0]", s.Split(new[] { System.Environment.NewLine }, StringSplitOptions.None)[0]);

        s = captureOutput("gpustat", "-a");
        Assert.Equal(MOCK_EXPECTED_OUTPUT_FULL, RemoveAnsiCodesAndHeaderLine(s));

        s = captureOutput("gpustat", "--color");
        Assert.DoesNotContain('\x0f', s);
        Assert.Equal(MOCK_EXPECTED_OUTPUT_DEFAULT, RemoveAnsiCodesAndHeaderLine(s));

        s = captureOutput("gpustat", "--no-color");
        var unescaped = RemoveAnsiCodes(s);
        Assert.Equal(s, unescaped);
        Assert.Equal(MOCK_EXPECTED_OUTPUT_DEFAULT, RemoveAnsiCodesAndHeaderLine(s));

        s = captureOutput("gpustat", "--no-processes");
        Assert.Equal(MOCK_EXPECTED_OUTPUT_NO_PROCESSES, RemoveAnsiCodesAndHeaderLine(s));

        s = captureOutput("gpustat", "--id", "1,2");
        Assert.Equal(string.Join(System.Environment.NewLine, MOCK_EXPECTED_OUTPUT_DEFAULT.Split(new[] { System.Environment.NewLine }, StringSplitOptions.None).Skip(1).Take(2)), RemoveAnsiCodesAndHeaderLine(s));
    }
}