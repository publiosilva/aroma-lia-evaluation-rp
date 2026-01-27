using Xunit;

public class TestSmell008
{
    [Fact(Skip = "coz it's not quick todo: to review")]
    public void TestSortAndCount()
    {
        var file = new FileInfo("resources/IntegerArray.txt");
        try
        {
            var list = MyArrayUtil.ListIntegerFromFile(file, 93000);

            var A = MyArrayUtil.ListIntegersToIntegerArray(list);

            var D_total = ArrayInversion.SortAndCount(A, A.Length, 0, A.Length - 1);

            var D = D_total.GetLeft();

            MyArrayUtil.CheckArrayIntegerSorted(D);

            int expectedInversions = ArrayInversion.BruteForceCount(A);
            System.Console.WriteLine("-------------------------------------------");
            System.Console.WriteLine("ArrayInversionTest.TestSortAndCount() expect " + expectedInversions + " inversions");
            System.Console.WriteLine("-------------------------------------------");
            Assert.Equal(expectedInversions, (int)D_total.GetRight());
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