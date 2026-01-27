import org.junit.Test;
import static org.junit.Assert.*;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class TestSmell155 {

    @Test
    public void testAddPost(WebDriver site, String xSelector1, String xSelector2, String btnSelector, String createBtn, String postTitleInput, String postDescriptionInput, String postContentInput, String postSaveBtn, String postTitleSelector) {
        WebElement createPostBtn = site.findElement(By.cssSelector(createBtn));
        createPostBtn.click();
        try {
            Thread.sleep(testdata.get("wait"));
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        WebElement titleInput = site.findElement(By.xpath(postTitleInput));
        titleInput.sendKeys(postTitle);

        WebElement descriptionInput = site.findElement(By.xpath(postDescriptionInput));
        descriptionInput.sendKeys(postDescription);

        WebElement contentInput = site.findElement(By.xpath(postContentInput));
        contentInput.sendKeys(postContent);
        try {
            Thread.sleep(testdata.get("wait"));
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        WebDriverWait wait = new WebDriverWait(site, 10);
        WebElement saveButton = wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector(postSaveBtn)));
        saveButton.click();

        WebElement savedPostTitle = wait.until(
            ExpectedConditions.presenceOfElementLocated(By.xpath("//h1[text()='" + postTitle + "']"))
        );

        WebElement postTitleElement = site.findElement(By.xpath(postTitleSelector));
        assertEquals(postTitle, postTitleElement.getText());
    }
}