import pytest

class TestMTest:
    def test_smell_028(self):
        t = M()
        
        t.to_binary("57", 1)
        screen2 = M.screen2.get_text()
        assert screen2 == "111001"
        
        t.to_binary("19991", 1)
        screen2 = M.screen2.get_text()
        assert screen2 == "100111000010111"
        
        t.to_binary("15", 1)
        screen2 = M.screen2.get_text()
        assert screen2 == "1111"
        
        t.to_binary("100", 1)
        screen2 = M.screen2.get_text()
        assert screen2 == "1100100"
        
        t.to_binary("F", 3)
        screen2 = M.screen2.get_text()
        assert screen2 == "1111"
        
        t.to_binary("106F", 3)
        screen2 = M.screen2.get_text()
        assert screen2 == "1000001101111"
        
        t.to_binary("FF1", 3)
        screen2 = M.screen2.get_text()
        assert screen2 == "111111110001"
        
        t.to_binary("111", 3)
        screen2 = M.screen2.get_text()
        assert screen2 == "100010001"