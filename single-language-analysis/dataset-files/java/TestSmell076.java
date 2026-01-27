// Original URL: https://github.com/daluu/AutoItDriverServer/blob/331ef82d824d15da4a171004ef6bd740829851de/sample-code/CalculatorTest.java#L24-L43

public class TestSmell076 {
	@Test
	public void test() throws Exception{
		// demo adapted from 
		// http://www.joecolantonio.com/2014/07/02/selenium-autoit-how-to-automate-non-browser-based-functionality/
		driver.get("calc.exe");
		driver.switchTo().window("Calculator");
		Thread.sleep(1000);
		driver.findElement(By.id("133")).click(); // 3
		Thread.sleep(1000);
		driver.findElement(By.id("93")).click(); // +
		Thread.sleep(1000);
		driver.findElement(By.id("133")).click(); // 3
		Thread.sleep(1000);
		driver.findElement(By.id("121")).click(); // =
		Thread.sleep(1000);
		Assert.assertEquals("3 + 3 did not produce 6 as expected.", "6", driver.findElement(By.id("150")).getText());
		driver.findElement(By.id("81")).click(); // Clear "C" button
		Thread.sleep(1000);
		driver.close();
	}
}
