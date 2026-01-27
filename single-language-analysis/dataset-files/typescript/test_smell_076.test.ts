import { expect } from '@jest/globals';

describe('CalculatorTest', () => {
    it("test_smell_076", async () => {
        // demo adapted from 
        // http://www.joecolantonio.com/2014/07/02/selenium-autoit-how-to-automate-non-browser-based-functionality/
        await driver.get("calc.exe");
        await driver.switchTo().window("Calculator");
        await new Promise(resolve => setTimeout(resolve, 1000));
        await driver.findElement(By.id("133")).click(); // 3
        await new Promise(resolve => setTimeout(resolve, 1000));
        await driver.findElement(By.id("93")).click(); // +
        await new Promise(resolve => setTimeout(resolve, 1000));
        await driver.findElement(By.id("133")).click(); // 3
        await new Promise(resolve => setTimeout(resolve, 1000));
        await driver.findElement(By.id("121")).click(); // =
        await new Promise(resolve => setTimeout(resolve, 1000));
        expect(await driver.findElement(By.id("150")).getText()).toBe("6");
        await driver.findElement(By.id("81")).click(); // Clear "C" button
        await new Promise(resolve => setTimeout(resolve, 1000));
        await driver.close();
    });
});