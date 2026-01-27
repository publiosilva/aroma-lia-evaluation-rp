using Xunit;

public class TestSmell071
{
    [Fact]
    public void ManyVotes()
    {
        var vote = new Vote(2);
        for (var i = 0; i < 4; i++)
        {
            ThreadPool.QueueUserWorkItem(_ =>
            {
                try
                {
                    Thread.Sleep(1_000);
                    Assert.Equal("0", vote.Vote("1"));
                }
                catch (Exception e)
                {
                    throw new AssertionException(e.Message);
                }
            });
        }
        Assert.Equal("0", vote.Vote("0"));
    }
}