using Xunit;
using System.Threading;

public class TestSmell156
{
    [Fact]
    public void TestHelloWorld()
    {
        var p = Player.FromDescription("videotestsrc ! fakesink");
        p.Play();
        Thread.Sleep(5000);
        p.Stop();
    }
}