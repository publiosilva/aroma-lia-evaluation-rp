using Xunit;

public class TestSmell005
{
    [Fact]
    public void Loop()
    {
        Assert.Equal("1223334444", LoopObj.Loop(4));
        Assert.Equal("1", LoopObj.Loop(1));
        Assert.Equal("122333", LoopObj.Loop(3));
    }
}