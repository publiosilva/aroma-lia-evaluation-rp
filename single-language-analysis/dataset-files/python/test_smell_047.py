import pytest

class TestMain:
    def test_smell_047(self):
        try:
            FileNotFoundException()
            assert False, "Exception not thrown"
        except UnsupportedOperationException as e:
            assert e.message == "Operation Not Supported"