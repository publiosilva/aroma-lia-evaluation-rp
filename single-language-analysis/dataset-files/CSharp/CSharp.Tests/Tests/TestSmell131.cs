using Xunit;

public class TestSmell131
{
    [Fact(Skip = "Do not run on Windows")]
    public void TestNoTERM()
    {
        SetEnv("TERM", "");

        var s = CaptureOutput("gpustat", "--color", "--no-header").TrimEnd();
        System.Console.WriteLine(s);
        Assert.Equal(MOCK_EXPECTED_OUTPUT_DEFAULT, RemoveAnsiCodes(s));
        
        Assert.Contains("\x1b[36m", s);
        Assert.DoesNotContain("\x0f", s);
    }

    private void SetEnv(string key, string value)
    {
        // Implementation for setting environment variable
    }

    private string CaptureOutput(params string[] args)
    {
        // Implementation for capturing output
        return string.Empty;
    }

    private string RemoveAnsiCodes(string input)
    {
        // Implementation for removing ANSI codes
        return input;
    }
}