const { expect } = require('jest');

describe('BasicOptions', () => {
    it("test_smell_166", () => {
        const options = new webdriver.FirefoxOptions();
        const driver = new webdriver.Firefox({ options: options });

        driver.quit();
    });
});