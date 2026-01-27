using Xunit;

public class TestSmell106
{
    [Fact]
    public void TestOnlyOnErrors()
    {
        int x = 2;
        int callCount = 0;
        bool raised = false;
        int n = 0;

        int Fn()
        {
            callCount += 1;
            try
            {
                return DivideByX();
            }
            catch (DivideByZeroException)
            {
                raised = true;
                throw;
            }
        }

        int DivideByX()
        {
            return 0 / x;
        }

        Assert.Equal(1, Fn());
        Assert.Equal(1, callCount);
        Assert.Equal(2, Fn());
        Assert.Equal(2, callCount);
        Assert.Equal(0, x);
        Assert.Equal(2, Fn());
        Assert.Equal(3, callCount);
        Assert.True(raised);
        Assert.Equal(2, Fn());
        x = 1;
        raised = false;
        Assert.Equal(3, Fn());
        Assert.Equal(5, callCount);
        Assert.Equal(3, Fn());
        Assert.True(raised);
        Assert.Equal(6, callCount);
        // fn._cache.clear(); // Cache clearing not implemented
        Assert.Throws<DivideByZeroException>(() => Fn());
    }
}