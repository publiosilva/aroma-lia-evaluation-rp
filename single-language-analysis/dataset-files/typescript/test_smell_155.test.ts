import { expect } from '@jest/globals';

describe('AddPost', () => {
    it("test_smell_155", async () => {
        const createPostBtn = site.findElement("css", createBtn);
        await createPostBtn.click();
        await new Promise(resolve => setTimeout(resolve, testdata["wait"]));

        const titleInput = site.findElement("xpath", postTitleInput);
        await titleInput.sendKeys(postTitle);

        const descriptionInput = site.findElement("xpath", postDescriptionInput);
        await descriptionInput.sendKeys(postDescription);

        const contentInput = site.findElement("xpath", postContentInput);
        await contentInput.sendKeys(postContent);
        await new Promise(resolve => setTimeout(resolve, testdata["wait"]));

        const wait = new WebDriverWait(site.driver, 10);
        const saveButton = await wait.until(EC.elementToBeClickable((By.CSS_SELECTOR, postSaveBtn)));
        await saveButton.click();

        const savedPostTitle = await wait.until(
            EC.presenceOfElementLocated((By.XPATH, `//h1[text()='${postTitle}']`))
        );

        const postTitleElement = site.findElement("xpath", postTitleSelector);
        expect(postTitleElement.text).toBe(postTitle);
    });
});