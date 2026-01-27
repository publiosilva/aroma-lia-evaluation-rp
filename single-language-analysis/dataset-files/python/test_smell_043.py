import pytest

class TestVoteTest:
    def test_smell_043(self):
        vote = Vote(3)

        def thread_one():
            try:
                time.sleep(1)
                assert vote.vote("1") == "0"
            except InterruptedException as e:
                raise AssertionError(e)

        def thread_two():
            try:
                time.sleep(0.5)
                assert vote.vote("0") == "0"
            except InterruptedException as e:
                raise AssertionError(e)

        threading.Thread(target=thread_one).start()
        threading.Thread(target=thread_two).start()
        assert vote.vote("0") == "0"