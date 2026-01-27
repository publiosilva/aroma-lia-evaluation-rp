using Xunit;

public class TestSmell063
{
    [Fact]
    public void TestHashCode()
    {
        Opad myOpad = new Opad(new SerialNumber(new BigInteger("4")), null);
        Assert.Equal(4, myOpad.GetHashCode());
    }
}