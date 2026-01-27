using Xunit;

public class TestSmell166
{
    [Fact]
    public void TestBasicOptions()
    {
        var Options = new FirefoxOptions();
        var Driver = new FirefoxDriver(Options);

        Driver.Quit();
    }
}