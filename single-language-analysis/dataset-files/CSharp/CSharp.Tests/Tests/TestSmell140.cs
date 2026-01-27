using Xunit;

public class TestSmell140
{
    [Fact]
    public void TestStringCallback()
    {
        int Callback(string code)
        {
            if (code == "r")
            {
                return 0;
            }
            else
            {
                return 1;
            }
        }

        var f = this.Module.GetType().GetMethod("string_callback");
        var r = (int)f.Invoke(this.Module, new object[] { (Func<string, int>)Callback });
        Assert.Equal(0, r);
    }
}