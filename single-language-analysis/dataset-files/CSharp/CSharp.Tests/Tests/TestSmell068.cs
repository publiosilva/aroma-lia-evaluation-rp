using Xunit;

public class TestSmell068
{
    [Fact]
    public void TestEqualsObject()
    {
        SetUp();
        Assert.True(q1.Equals(q1));
        Assert.False(q1.Equals(new string("A B C D E F G H I J K L")));
        for (int i = 0; i < 9; i++)
        {
            q1.Dequeue();
        }
        System.Console.WriteLine(q1);
        Queue<string> test = new Queue<string>();
        test.Enqueue(new string("J"));
        test.Enqueue(new string("K"));
        test.Enqueue(new string("L"));
        Assert.True(q1.Equals(test));
        test.Dequeue();
        Assert.False(q1.Equals(test));
        Queue<double> test2 = new Queue<double>(new double[] { 1.1, 2.2, 3.2, 4.4 });
        Assert.False(test2.Equals(q3));
        Assert.False(test2.Equals(test));
    }

    private void SetUp()
    {
        // Implementation of setUp method
    }
}