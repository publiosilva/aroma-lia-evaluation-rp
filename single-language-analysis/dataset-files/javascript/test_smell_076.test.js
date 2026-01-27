const { expect } = require('jest');

describe('CalculatorTest', () => {
    it("test_smell_076", async () => {
        driver.get("calc.exe");
        driver.switchTo().window("Calculator");
        await new Promise(resolve => setTimeout(resolve, 1000));
        driver.findElement(By.id("133")).click(); // 3
        await new Promise(resolve => setTimeout(resolve, 1000));
        driver.findElement(By.id("93")).click(); // +
        await new Promise(resolve => setTimeout(resolve, 1000));
        driver.findElement(By.id("133")).click(); // 3
        await new Promise(resolve => setTimeout(resolve, 1000));
        driver.findElement(By.id("121")).click(); // =
        await new Promise(resolve => setTimeout(resolve, 1000));
        expect(driver.findElement(By.id("150")).getText()).toBe("6", "3 + 3 did not produce 6 as expected.");
        driver.findElement(By.id("81")).click(); // Clear "C" button
        await new Promise(resolve => setTimeout(resolve, 1000));
        driver.close();
    });
});