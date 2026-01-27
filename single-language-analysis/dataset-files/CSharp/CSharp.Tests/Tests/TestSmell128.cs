using Xunit;

public class TestSmell128
{
    [Fact]
    public void TestDirectionAndValueOfPinIsResetWhenClosed()
    {
        using (var pin = Pins.Pin(0, Out))
        {
            pin.Value = 1;
        }

        GpioAdmin("export", 17, PullDown);
        try
        {
            Assert.Equal("0\n", ContentOf("/sys/class/gpio/gpio17/value"));
            Assert.Equal("in\n", ContentOf("/sys/class/gpio/gpio17/direction"));
        }
        catch
        {
        }
        finally
        {
            GpioAdmin("unexport", 17);
        }
    }
}