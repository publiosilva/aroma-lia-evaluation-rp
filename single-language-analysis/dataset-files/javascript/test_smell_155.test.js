const { expect } = require('jest');

describe('ClassName', () => {
    it("test_smell_155", async () => {
        const createPostBtn = site.findElement("css", createBtn);
        createPostBtn.click();
        await new Promise(resolve => setTimeout(resolve, testdata["wait"]));

        const titleInput = site.findElement("xpath", postTitleInput);
        titleInput.sendKeys(postTitle);

        const descriptionInput = site.findElement("xpath", postDescriptionInput);
        descriptionInput.sendKeys(postDescription);

        const contentInput = site.findElement("xpath", postContentInput);
        contentInput.sendKeys(postContent);
        await new Promise(resolve => setTimeout(resolve, testdata["wait"]));

        const wait = new WebDriverWait(site.driver, 10);
        const saveButton = await wait.until(EC.elementToBeClickable((By.CSS_SELECTOR, postSaveBtn)));
        saveButton.click();

        const savedPostTitle = await wait.until(
            EC.presenceOfElementLocated((By.XPATH, `//h1[text()='${postTitle}']`))
        );

        const postTitleElement = site.findElement("xpath", postTitleSelector);
        expect(postTitleElement.getText()).toBe(postTitle);
    });
});