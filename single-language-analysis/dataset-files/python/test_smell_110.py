# Original URL: https://github.com/m-bo-one/ethereumd-proxy/blob/1d1eb3905dac4b28a8e23c283214859a13f6e020/tests/test_poller.py#L126-L155

class TestIncorrectFakePoller(FakePoller):

    @pytest.mark.asyncio
    @setup_proxies
    async def test_smell_110(self):
        with patch('ethereumd.poller.Poller.poll'):
            poller = Poller(self.rpc_proxy)
            assert poller.has_blocknotify is False
            assert poller.has_walletnotify is False
            assert poller.has_alertnotify is False

            poller = Poller(self.rpc_proxy, cmds={'blocknotify': 'echo "%s"'})
            assert poller.has_blocknotify is True
            assert poller.has_walletnotify is False
            assert poller.has_alertnotify is False

            poller = Poller(self.rpc_proxy, cmds={'walletnotify': 'echo "%s"'})
            assert poller.has_blocknotify is False
            assert poller.has_walletnotify is True
            assert poller.has_alertnotify is False

            poller = Poller(self.rpc_proxy, cmds={'alertnotify': 'echo "%s"'})
            assert poller.has_blocknotify is False
            assert poller.has_walletnotify is False
            assert poller.has_alertnotify is True

            poller = Poller(self.rpc_proxy, cmds={'blocknotify': 'echo "%s"',
                                                  'walletnotify': 'echo "%s"',
                                                  'alertnotify': 'echo "%s"'})
            assert poller.has_blocknotify is True
            assert poller.has_walletnotify is True
            assert poller.has_alertnotify is True
