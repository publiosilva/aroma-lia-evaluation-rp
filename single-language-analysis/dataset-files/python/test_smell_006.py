import pytest

class TestWeibo:
    def test_smell_006(self):
        assert weibo.get_favorites() is not None
        assert weibo.get_favorites(2) is not None
        id = 4052331047
        assert weibo.create_favorite(id) is not None
        import time
        time.sleep(1)
        assert weibo.destroy_favorite(id) is not None