using Xunit;

public class TestSmell110 : FakePoller
{
    [Fact]
    public async void TestMethodHasCommand()
    {
        using (var patch = new Patch("ethereumd.poller.Poller.poll"))
        {
            var poller = new Poller(this.RpcProxy);
            Assert.Equal(false, poller.HasBlockNotify);
            Assert.Equal(false, poller.HasWalletNotify);
            Assert.Equal(false, poller.HasAlertNotify);

            poller = new Poller(this.RpcProxy, cmds: new Dictionary<string, string> { { "blocknotify", "echo \"%s\"" } });
            Assert.Equal(true, poller.HasBlockNotify);
            Assert.Equal(false, poller.HasWalletNotify);
            Assert.Equal(false, poller.HasAlertNotify);

            poller = new Poller(this.RpcProxy, cmds: new Dictionary<string, string> { { "walletnotify", "echo \"%s\"" } });
            Assert.Equal(false, poller.HasBlockNotify);
            Assert.Equal(true, poller.HasWalletNotify);
            Assert.Equal(false, poller.HasAlertNotify);

            poller = new Poller(this.RpcProxy, cmds: new Dictionary<string, string> { { "alertnotify", "echo \"%s\"" } });
            Assert.Equal(false, poller.HasBlockNotify);
            Assert.Equal(false, poller.HasWalletNotify);
            Assert.Equal(true, poller.HasAlertNotify);

            poller = new Poller(this.RpcProxy, cmds: new Dictionary<string, string> 
            { 
                { "blocknotify", "echo \"%s\"" }, 
                { "walletnotify", "echo \"%s\"" }, 
                { "alertnotify", "echo \"%s\"" } 
            });
            Assert.Equal(true, poller.HasBlockNotify);
            Assert.Equal(true, poller.HasWalletNotify);
            Assert.Equal(true, poller.HasAlertNotify);
        }
    }
}