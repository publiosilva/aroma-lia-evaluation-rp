using Xunit;

public class TestSmell079
{
    [Fact]
    public void Should_Not_Throw_Stack_Overflow()
    {
        Tail.StreamFactorial(56789);
    }
}