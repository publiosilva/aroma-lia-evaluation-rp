using Xunit;

public class TestSmell149
{
    [Fact]
    public void TestWebview()
    {
        this.Driver.FindElementByXPath("//*[@text='交易']").Click();
        for (int i = 0; i < 5; i++)
        {
            System.Threading.Thread.Sleep(1000);
            System.Console.WriteLine(this.Driver.Contexts);
        }

        this.Driver.FindElementByAccessibilityId("A股开户").Click();
    }
}