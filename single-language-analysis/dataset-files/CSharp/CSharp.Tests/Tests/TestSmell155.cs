using Xunit;

public class TestSmell155
{
    [Fact]
    public void TestAddPostMethod()
    {
        var CreatePostBtn = Site.FindElement("css", CreateBtn);
        CreatePostBtn.Click();
        System.Threading.Thread.Sleep(Testdata["wait"]);

        var TitleInput = Site.FindElement("xpath", PostTitleInput);
        TitleInput.SendKeys(PostTitle);

        var DescriptionInput = Site.FindElement("xpath", PostDescriptionInput);
        DescriptionInput.SendKeys(PostDescription);

        var ContentInput = Site.FindElement("xpath", PostContentInput);
        ContentInput.SendKeys(PostContent);
        System.Threading.Thread.Sleep(Testdata["wait"]);

        var Wait = new WebDriverWait(Site.Driver, TimeSpan.FromSeconds(10));
        var SaveButton = Wait.Until(ExpectedConditions.ElementToBeClickable(By.CssSelector(PostSaveBtn)));
        SaveButton.Click();

        var SavedPostTitle = Wait.Until(
            ExpectedConditions.PresenceOfElementLocated(By.XPath($"//h1[text()='{PostTitle}']"))
        );

        var PostTitleElement = Site.FindElement("xpath", PostTitleSelector);
        Assert.Equal(PostTitle, PostTitleElement.Text);
    }
}