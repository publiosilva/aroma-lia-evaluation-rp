import pytest

class TestOpadTest:
    def test_smell_026(self):
        my_arr = []
        my_set = set(my_arr)
        my_opad = Opad(SerialNumber(BigInteger("4")), Optional.of(my_set))

        assert my_opad.get_description() == Optional.of(my_set)

        my_arr.append("OPAD")
        my_set = set(my_arr)
        my_opad = Opad(SerialNumber(BigInteger("4")), Optional.of(my_set))
        assert my_opad.get_description() == Optional.of(my_set)

        my_arr.append("is")
        my_arr.append("the")
        my_arr.append("Product")
        my_set = set(my_arr)
        my_opad = Opad(SerialNumber(BigInteger("4")), Optional.of(my_set))
        assert my_opad.get_description() == Optional.of(my_set)