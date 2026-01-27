using Xunit;

public class TestSmell057
{
    [Fact]
    public void TestView()
    {
        Help.View();
        Ui user = new Ui();
        user.GetValidInt();
        Assert.Equal(4, Ui.GetValidInt());
    }
}