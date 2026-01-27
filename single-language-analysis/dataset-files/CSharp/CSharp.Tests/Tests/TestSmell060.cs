using Xunit;

public class TestSmell060
{
    [Fact]
    public void DecrementSpeed()
    {
        Volvo240 volvo240 = new Volvo240(0, 0);
        volvo240.StartEngine();
        volvo240.DecrementSpeed(0.01);
        double delta = 0.0001;
        Assert.Equal(0.0875, volvo240.GetCurrentSpeed(), delta);
    }
}