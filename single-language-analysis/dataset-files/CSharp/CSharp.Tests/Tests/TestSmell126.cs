using Xunit;

public class TestSmell126
{
    [Fact]
    public void TestIntegerOverflowMethod()
    {
        try
        {
            Project10.Lex("12345678");

            Assert.False(true);
        }
        catch
        {
        }
    }
}