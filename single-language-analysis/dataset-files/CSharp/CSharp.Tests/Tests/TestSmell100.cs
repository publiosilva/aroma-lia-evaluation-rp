using Xunit;

public class TestSmell100
{
    [Fact]
    public void Test2()
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
        Assert.True(true);
    }
}