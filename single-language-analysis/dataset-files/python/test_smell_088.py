# Original URL: https://github.com/m-bo-one/ethereumd-proxy/blob/1d1eb3905dac4b28a8e23c283214859a13f6e020/tests/test_poller.py#L30-L40

class TestPoller(BaseTestRunner):

    @pytest.mark.asyncio
    async def test_smell_088(self):
        class CorrectFakePoller(FakePoller):
            @alertnotify(exceptions=(Exception,))
            async def valid_func(self):
                pass

        poller = CorrectFakePoller()
        assert poller.has_alertnotify is False
        result = await poller.valid_func()
        assert result is None