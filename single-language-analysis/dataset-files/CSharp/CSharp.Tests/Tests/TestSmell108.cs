using Xunit;

public class TestSmell108
{
    [Fact]
    public void TestCanSetDirectionOnConstruction()
    {
        var Pin = Pins.Pin(0, Out);
        
        Assert.Equal(Out, Pin.Direction);
        Assert.False(System.IO.File.Exists("/sys/class/gpio/gpio17/direction"));
        
        using (Pin)
        {
            Assert.Equal("out\n", ContentOf("/sys/class/gpio/gpio17/direction"));
            Assert.Equal(Out, Pin.Direction);
        }
    }

    private string ContentOf(string path)
    {
        return System.IO.File.ReadAllText(path);
    }
}