const { expect } = require('jest');

describe('Demo', () => {
    it("test_smell_149", async () => {
        this.driver.findElementByXPath("//*[@text='交易']").click();
        for (let i = 0; i < 5; i++) {
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log(this.driver.contexts);
        }
        this.driver.findElementByAccessibilityId("A股开户").click();
    });
});