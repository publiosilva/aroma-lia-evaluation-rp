using Xunit;

public class TestSmell026
{
    [Fact]
    public void TestGetDescription()
    {
        var myArr = new List<string>();
        var mySet = new HashSet<string>(myArr);
        var myOpad = new Opad(new SerialNumber(new BigInteger("4")), Optional.Of(mySet));

        // Empty
        Assert.Equal(Optional.Of(mySet), myOpad.GetDescription());

        // One element
        myArr.Add("OPAD");
        mySet = new HashSet<string>(myArr);
        myOpad = new Opad(new SerialNumber(new BigInteger("4")), Optional.Of(mySet));
        Assert.Equal(Optional.Of(mySet), myOpad.GetDescription());

        // Multiple Elements
        myArr.Add("is");
        myArr.Add("the");
        myArr.Add("Product");
        mySet = new HashSet<string>(myArr);
        myOpad = new Opad(new SerialNumber(new BigInteger("4")), Optional.Of(mySet));
        Assert.Equal(Optional.Of(mySet), myOpad.GetDescription());
    }
}