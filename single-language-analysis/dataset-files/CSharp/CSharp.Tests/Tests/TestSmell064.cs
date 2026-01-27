using Xunit;

public class TestSmell064
{
    [Fact]
    public void TestMean()
    {
        Assert.Equal(0.0, Cell.CalculateMean(new List<float>()), 0.001);
        Assert.Equal(0.0, Cell.CalculateMean(null), 0.001);
        Assert.Equal(2.0, Cell.CalculateMean(new List<float> { 1f, 2f, 3f }), 0.001);
    }
}