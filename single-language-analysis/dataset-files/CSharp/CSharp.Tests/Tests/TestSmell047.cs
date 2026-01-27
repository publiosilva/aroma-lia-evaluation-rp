using Xunit;

public class TestSmell047
{
    [Fact]
    public void Main()
    {
        try
        {
            new System.IO.FileNotFoundException();
            Assert.True(false, "Exception not thrown");
        }
        catch (System.NotSupportedException e)
        {
            Assert.Equal("Operation Not Supported", e.Message);
        }
    }
}