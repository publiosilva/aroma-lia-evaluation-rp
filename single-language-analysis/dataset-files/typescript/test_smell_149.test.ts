import { expect } from '@jest/globals';

describe('Demo', () => {
    it("test_smell_149", async () => {
        await this.driver.findElementByXPath("//*[@text='交易']").click();
        for (let i = 0; i < 5; i++) {
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log(await this.driver.contexts);
        }

        await this.driver.findElementByAccessibilityId("A股开户").click();
    });
});