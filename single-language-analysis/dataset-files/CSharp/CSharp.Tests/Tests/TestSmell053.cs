using Xunit;

public class TestSmell053
{
    [Fact(Skip = "")]
    public void InterruptWithoutGetChoice_GivenRunning()
    {
        Thread thread = ArrangeNewGame();

        AssertInterrupt(thread);
    }
}