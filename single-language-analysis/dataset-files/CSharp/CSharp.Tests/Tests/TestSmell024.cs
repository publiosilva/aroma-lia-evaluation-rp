using Xunit;

public class TestSmell024
{
    [Fact(Skip = "coz it's not quick todo: to review")]
    public void TestBigIntegerSortAndCount()
    {
        var file = new FileInfo("resources/IntegerArray.txt");
        try
        {
            var list = MyArrayUtil.ListIntegerFromFile(file);

            var A = MyArrayUtil.ListIntegersToIntegerArray(list);

            var D_total = ArrayInversion.SortAndCount(A, A.Length, 0, A.Length - 1);

            var D = D_total.Left;

            MyArrayUtil.CheckArrayIntegerSorted(D);

            var expectedInversions = ArrayInversion.BigIntegerBruteForceCount(A);
            System.Console.WriteLine("expect " + expectedInversions + " inversions");
            // Assert.Equal(expectedInversions, (int)D_total.Right);

        }
        catch (FileNotFoundException e)
        {
            System.Console.WriteLine(e.StackTrace); // To change body of catch statement use File | Settings | File Templates.
            Assert.Fail();
        }
        catch (IOException e)
        {
            System.Console.WriteLine(e.StackTrace);
            Assert.Fail();
        }
    }
}