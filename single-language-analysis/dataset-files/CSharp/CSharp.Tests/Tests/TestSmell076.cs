using Xunit;

public class TestSmell076
{
    [Fact]
    public void Test()
    {
        driver.Get("calc.exe");
        driver.SwitchTo().Window("Calculator");
        System.Threading.Thread.Sleep(1000);
        driver.FindElement(By.Id("133")).Click(); // 3
        System.Threading.Thread.Sleep(1000);
        driver.FindElement(By.Id("93")).Click(); // +
        System.Threading.Thread.Sleep(1000);
        driver.FindElement(By.Id("133")).Click(); // 3
        System.Threading.Thread.Sleep(1000);
        driver.FindElement(By.Id("121")).Click(); // =
        System.Threading.Thread.Sleep(1000);
        Assert.Equal("6", driver.FindElement(By.Id("150")).Text);
        driver.FindElement(By.Id("81")).Click(); // Clear "C" button
        System.Threading.Thread.Sleep(1000);
        driver.Close();
    }
}