import pytest

class TestOpadTest:
    def test_smell_042(self):
        # Test status OK and Result correct
        b = Exchange.Builder()
        status = RequestStatus()
        b.add_compatible(SerialNumber(BigInteger("13"))).add_compatible(SerialNumber(BigInteger("16")))
        my_opad = Opad(SerialNumber(BigInteger("15")), Optional.empty())
        try:
            exchange = b.build()
            my_opad.process(exchange, status)
            assert RequestStatus.StatusCode.OK == status.get_status_code()
            assert Optional.of(BigInteger("13")) == status.get_result()
        except Exception as e:
            print("exception: ", e)
        
        # Test status FAIL and result empty
        builder = Exchange.Builder()
        try:
            exchange = builder.build()
            my_opad.process(exchange, status)
            assert RequestStatus.StatusCode.FAIL == status.get_status_code()
            assert Optional.empty() == status.get_result()
        except Exception as e:
            print("exception: ", e)
        
        builder.add_compatible(SerialNumber(BigInteger("17"))).add_compatible(SerialNumber(BigInteger("201")))
        try:
            exchange = builder.build()
            my_opad.process(exchange, status)
            assert RequestStatus.StatusCode.FAIL == status.get_status_code()
            assert Optional.empty() == status.get_result()
        except Exception as e:
            print("exception: ", e)

        # The following is the JUNIT test required in the SPEC
        my_builder = Exchange.Builder()
        my_builder.add_compatible(SerialNumber(BigInteger("1032"))).add_compatible(SerialNumber(BigInteger("1244")))
        my_opad = Opad(SerialNumber(BigInteger("1048")), Optional.empty())
        try:
            exchange = my_builder.build()
            my_opad.process(exchange, status)
            assert RequestStatus.StatusCode.OK == status.get_status_code()
            assert Optional.of(BigInteger("1032")) == status.get_result()
        except Exception as e:
            print("exception: ", e)