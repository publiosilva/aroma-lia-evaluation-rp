import pytest

class TestOpad:
    def test_smell_063(self):
        my_opad = Opad(SerialNumber(BigInteger("4")), None)
        assert my_opad.hash_code() == 4