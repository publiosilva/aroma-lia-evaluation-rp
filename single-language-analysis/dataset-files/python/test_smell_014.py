import pytest

class TestBsTest:
    def test_smell_014(self):
        try:
            m = EDI.process_file("edi/sampledata/ACME_IDOC_SHIPMNT02out.txt", "", "", "", False, False, 0, 0, "")
            if m[0] == "0":
                print("sample 856idoc...  pass")
            else:
                print("sample 850idoc...  fail")
                print("m[1] message: " + m[1])
        except Exception as e:
            print("BS Exception: " + str(e))
        assert m[0] == "0"