using Xunit;

public class TestSmell045
{
    [Fact]
    public void Test_ProcessUpdate()
    {
        TestBeing being = new TestBeing();    
        being.SetVelocity(MakeVector(0.5f, 0.0f, 0.0f));
        being.UpdateTime();
        try
        {
            System.Threading.Thread.Sleep(1000);
        }
        catch (System.Exception e) 
        { 
            Assert.True(false); 
        }
        being.ProcessUpdate();
        Assert.Equal(0.5f, being.GetPosition().X, 1e-2);
        Assert.Equal(0.0f, being.GetPosition().Y, 1e-2);
        Assert.Equal(0.0f, being.GetPosition().Z, 1e-2);
    }
}