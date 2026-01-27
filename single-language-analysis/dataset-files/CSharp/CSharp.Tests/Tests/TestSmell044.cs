using Xunit;

public class TestSmell044
{
    [Fact(Skip = "")]
    public void DebugSortAndCount()
    {
        var file = new FileInfo("resources/IntegerArray.txt");
        try
        {
            var list = MyArrayUtil.ListIntegerFromFile(file, 94650);
            System.Console.WriteLine("list size:" + list.Count);

            var A = MyArrayUtil.ListIntegersToIntegerArray(list);

            var D_total = ArrayInversion.SortAndCount(A, A.Length, 0, A.Length - 1);

            var D = D_total.Left;

            MyArrayUtil.CheckArrayIntegerSorted(D);
            System.Console.WriteLine("expect " + D_total.Right + " inversions");
            int expectedInversions = ArrayInversion.BruteForceCount(A);
            Assert.Equal(expectedInversions, (int)D_total.Right);
        }
        catch (FileNotFoundException e)
        {
            System.Console.WriteLine(e.StackTrace);
            Assert.True(false);
        }
        catch (IOException e)
        {
            System.Console.WriteLine(e.StackTrace);
            Assert.True(false);
        }
    }
}