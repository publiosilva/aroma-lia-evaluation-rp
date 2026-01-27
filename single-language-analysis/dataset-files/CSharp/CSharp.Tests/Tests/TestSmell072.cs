using Xunit;

public class TestSmell072
{
    [Fact]
    public void TestFriendship()
    {
        Assert.NotNull(Weibo.CreateFriendship("1646678371"));
        System.Threading.Thread.Sleep(1000);
        Assert.NotNull(Weibo.DestroyFriendship("1646678371"));
        Assert.NotNull(Weibo.ExistsFriendship("1377583044", "1646678371"));
    }
}