using Xunit;

public class TestSmell133
{
    [Fact(Skip = "5 seconds is also too long")]
    public void TestPrimesParallel()
    {
        var t0 = Time.Time();
        var results = CheckNumbersPrimeConcurrently();
        var count = results.Count(result => result[1]);
        var deltaTime = Time.Time() - t0;
        Assert.Equal(112, count);
        Assert.True(deltaTime < 5);
    }

    private dynamic CheckNumbersPrimeConcurrently()
    {
        // Implementation goes here
    }
}