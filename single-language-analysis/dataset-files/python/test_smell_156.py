# Original URL: https://github.com/ashwoods/gst-c-crash/blob/44f4fbae488d5e5e9432f4546f025395e89d32ea/tests/test_0.py#L6-L12

async def test_smell_156(Player):
    """Hello world test to verify docker setup"""

    p = Player.from_description("videotestsrc ! fakesink")
    await p.play()
    await asyncio.sleep(5)
    await p.stop()