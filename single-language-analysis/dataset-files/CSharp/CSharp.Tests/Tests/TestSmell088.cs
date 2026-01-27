using Xunit;

public class TestSmell088 : BaseTestRunner
{
    [Fact]
    public async void TestAlertNotifyValidFuncWithoutErrors()
    {
        class CorrectFakePoller : FakePoller
        {
            [AlertNotify(exceptions = new[] { typeof(Exception) })]
            public async Task ValidFunc()
            {
                // Empty block
            }
        }

        var poller = new CorrectFakePoller();
        Assert.Equal(false, poller.HasAlertNotify);
        var result = await poller.ValidFunc();
        Assert.Equal(null, result);
    }
}