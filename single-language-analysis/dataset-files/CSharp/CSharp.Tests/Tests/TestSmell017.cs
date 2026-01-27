using Xunit;

public class TestSmell017
{
    [Fact]
    public void TestLinkedList1()
    {
        int ii;
        for (ii = 0; ii < 20; ii++)
        {
            list.InsertLast(ii);
        }
        Assert.Equal(20, list.GetCount());

        ii = 0;
        while (!list.IsEmpty())
        {
            int test = list.RemoveFirst();
            Assert.Equal(test, ii);
            ii++;
        }
        Assert.Equal(0, list.GetCount());
    }
}