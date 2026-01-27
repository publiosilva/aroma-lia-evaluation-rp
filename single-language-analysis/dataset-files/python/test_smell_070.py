import pytest

class TestBsTest:
    def test_smell_070(self):
        try:
            m = EDI.process_file("edi/sampledata/ACME_XML_order.xml", "", "", "", False, False, 0, 0, "")
            if m[0] == "0":
                print("sample 850xml...   pass")
            else:
                print("sample 850xml...   fail")
                print("m[1] message: " + m[1])
        except Exception as e:
            print("BS Exception: " + str(e))
        assert m[0] == "0"