using Xunit;

public class TestSmell123
{
    [Fact]
    public void TestPinMustBeOpenedBeforeUseAndIsUnusableAfterBeingClosed()
    {
        var pin = Pins.Pin(0);
        
        Assert.Throws<IOException>(() => pin.Value);
        
        pin.Open();
        try
        {
            var value = pin.Value;
        }
        finally
        {
            pin.Close();
        }
        
        Assert.Throws<IOException>(() => pin.Value);
    }
}