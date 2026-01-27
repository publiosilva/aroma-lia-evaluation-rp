using Xunit;

public class TestSmell138
{
    [Fact]
    public void TestKMeansElkanIterAttribute()
    {
        var Km = new KMeans(algorithm: "elkan", max_iter: 1).Fit(X);
        Assert.Equal(1, Km.NIter);
    }
}