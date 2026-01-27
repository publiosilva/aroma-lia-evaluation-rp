using Xunit;

public class TestSmell006
{
    [Fact]
    public void TestFavorites()
    {
        Assert.NotNull(Weibo.GetFavorites());
        Assert.NotNull(Weibo.GetFavorites(2));
        long id = 4052331047L;
        Assert.NotNull(Weibo.CreateFavorite(id));
        System.Threading.Thread.Sleep(1000);
        Assert.NotNull(Weibo.DestroyFavorite(id));
    }
}