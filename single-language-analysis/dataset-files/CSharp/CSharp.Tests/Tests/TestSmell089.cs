using Xunit;

public class TestSmell089
{
    [Fact]
    public void TestAstypeNonNanoTzaware()
    {
        var Dti = pd.date_range("2016-01-01", periods: 3, tz: "UTC");

        var Res = Dti.astype("M8[s, US/Pacific]");
        Assert.Equal("M8[s, US/Pacific]", Res.dtype);

        var Dta = Dti._data;
        Res = Dta.astype("M8[s, US/Pacific]");
        Assert.Equal("M8[s, US/Pacific]", Res.dtype);

        var Res2 = Res.astype("M8[s, UTC]");
        Assert.Equal("M8[s, UTC]", Res2.dtype);
        Assert.False(tm.shares_memory(Res2, Res));

        var Res3 = Res.astype("M8[s, UTC]", copy: false);
        Assert.Equal("M8[s, UTC]", Res2.dtype);
        Assert.True(tm.shares_memory(Res3, Res));
    }
}