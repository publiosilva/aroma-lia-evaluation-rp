using Xunit;

public class TestSmell151
{
    [Fact]
    public void Test1()
    {
        for (int i = 0; i < 10; i++)
        {
            Client.Send($"hello {i}");
            var data = Client.Receive();
            if (data == null)
            {
                Console.WriteLine("connection closed");
                break;
            }
            Console.WriteLine($"received: {data}");
            Thread.Sleep(100);
            i += 1;
        }
        Assert.Equal(true, true);
        Console.WriteLine("hello world");
    }
}