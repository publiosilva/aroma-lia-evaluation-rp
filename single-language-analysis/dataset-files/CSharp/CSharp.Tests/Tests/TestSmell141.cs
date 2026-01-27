using Xunit;

public class TestSmell141
{
    [Fact]
    public void Test_Idadf_Head_10()
    {
        var IdaHead = Idadf.Head(10);
        Assert.IsType<Pandas.Core.Frame.DataFrame>(IdaHead);
        Assert.Equal(10, IdaHead.Length);
    }
}