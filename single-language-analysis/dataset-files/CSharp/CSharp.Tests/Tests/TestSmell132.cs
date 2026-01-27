using Xunit;

public class TestSmell132
{
    [Fact(Skip = "tail on sorted dataframe fails in general, needs fixing first")]
    public void Test_Idadf_Tail_Sorted()
    {
        int SortIdx = df.Columns.Count - 1;
        string SortKey = idadf.Columns[SortIdx];
        var NewIdadf = idadf.Sort(SortKey);
        var IdaTail = NewIdadf.Tail();

        var DfTail = df.SortValues(SortKey).Tail();

        Assert.True(NewIdadf.InternalState.GetState().Contains(" ORDER BY "));
        Assert.IsType<pandas.core.frame.DataFrame>(IdaTail);
        Assert.Equal(5, IdaTail.Count);
        Assert.Equal(DfTail[SortKey].ToList(), IdaTail[SortKey].ToList());
    }
}