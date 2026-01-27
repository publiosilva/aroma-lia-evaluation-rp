using Xunit;

public class TestSmell095
{
    [Fact]
    public void Test_Idadf_Head_Projected_3col()
    {
        if (Idadf.Columns.Count >= 4)
        {
            var columns = Idadf.Columns.Skip(1).Take(3).ToList();
            var newIdadf = Idadf[columns];

            var sortKey = newIdadf.Columns[0];
            if (newIdadf.GetNumericalColumns().Count > 0)
            {
                sortKey = newIdadf.GetNumericalColumns()[0];
            }

            var idaHead = newIdadf.Head();

            var dfSorted = df.SortValues(sortKey);
            var dfHead = dfSorted[columns].Head();

            Assert.IsType<DataFrame>(idaHead);
            Assert.Equal(5, idaHead.Count);
            Assert.Equal(dfHead[sortKey].ToList(), idaHead[sortKey].ToList());
        }
    }
}