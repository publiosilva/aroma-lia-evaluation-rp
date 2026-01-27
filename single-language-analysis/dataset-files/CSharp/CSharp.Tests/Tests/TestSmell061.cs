using Xunit;

public class TestSmell061
{
    [Fact]
    public void TestFindMax() 
    {
        Assert.Equal(30, App.FindMax(new int[] { 1, 2, 30, 4 }));
    }
}