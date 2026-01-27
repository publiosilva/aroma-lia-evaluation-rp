using Xunit;

public class TestSmell010
{
    [Fact]
    public void Test_UpdateTime()
    {
        TestBeing being = new TestBeing();    
        being.UpdateTime();
        try
        {
            System.Threading.Thread.Sleep(10);
        }
        catch (System.Threading.ThreadInterruptedException e) 
        { 
            Assert.True(false); 
        }
        long elapsed = being.UpdateTime();
        Assert.Equal(1e7, elapsed, 1e6); // this COULD fail if the system is running slow
    }
}