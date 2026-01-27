# Original URL: https://github.com/alblasco/pytest_asyncio_issue/blob/dd23390c37422ef3a0fc64f069279bf2e44d5f0b/test_1.py#L18-L29

@pytest.mark.asyncio
async def test_smell_100(client):
    for i in range(10):
        await client.send(f'hello {i}')
        data = await client.receive()
        if not data:
            print('connection closed')
            break
        print(f'received: {data}')
        await asyncio.sleep(.1)
        i += 1
    assert True