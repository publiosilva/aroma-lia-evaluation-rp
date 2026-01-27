using Xunit;

public class TestSmell125
{
    [Fact]
    public void TestSuccess()
    {
        var path = GetTestCases(PASS_DIR);
        var outputMypy = OUTPUT_MYPY;
        if (path.Contains(outputMypy))
        {
            var msg = "Unexpected mypy output\n\n";
            foreach (var v in outputMypy[path])
            {
                msg += _StripFilename(v) + "\n";
            }
            throw new AssertionException(msg);
        }
    }
}