import pytest

class TestVoteTest:
    def test_smell_071(self):
        vote = Vote(2)
        
        def thread_function():
            try:
                time.sleep(1)
                assert vote.vote("1") == "0"
            except InterruptedException as e:
                raise AssertionError(e)

        threads = []
        for i in range(4):
            thread = threading.Thread(target=thread_function)
            threads.append(thread)
            thread.start()

        for thread in threads:
            thread.join()

        assert vote.vote("0") == "0"