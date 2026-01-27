using Xunit;

public class TestSmell043
{
    [Fact]
    public void SimpleVote()
    {
        var vote = new Vote(3);
        ThreadPool.QueueUserWorkItem(_ =>
        {
            try
            {
                Thread.Sleep(1000);
                Assert.Equal("0", vote.Vote("1"));
            }
            catch (InterruptedException e)
            {
                throw new AssertionError(e);
            }
        });
        ThreadPool.QueueUserWorkItem(_ =>
        {
            try
            {
                Thread.Sleep(500);
                Assert.Equal("0", vote.Vote("0"));
            }
            catch (InterruptedException e)
            {
                throw new AssertionError(e);
            }
        });
        Assert.Equal("0", vote.Vote("0"));
    }
}