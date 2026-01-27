import pytest

class TestWeibo:
    def test_smell_072(self):
        assert weibo.create_friendship("1646678371") is not None
        time.sleep(1)
        assert weibo.destroy_friendship("1646678371") is not None
        assert weibo.exists_friendship("1377583044", "1646678371") is not None