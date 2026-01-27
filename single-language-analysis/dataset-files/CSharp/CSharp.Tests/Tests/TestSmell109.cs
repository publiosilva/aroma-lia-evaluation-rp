using Xunit;

public class TestSmell109
{
    [Fact]
    public void TestAstypeNonNanoTzNaive()
    {
        var Dti = pd.date_range("2016-01-01", periods: 3);

        var Res = Dti.astype("M8[s]");
        Assert.Equal("M8[s]", Res.dtype);

        var Dta = Dti._data;
        Res = Dta.astype("M8[s]");
        Assert.Equal("M8[s]", Res.dtype);
        Assert.IsType<pd.core.arrays.DatetimeArray>(Res);
    }
}