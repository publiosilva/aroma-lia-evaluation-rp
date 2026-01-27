import pytest

class TestTreeTest:
    def test_smell_065(self):
        print("Test first left of right child")
        s = Tree()
        s.add(4)
        s.add(2)
        s.add(3)
        s.add(1)
        s.add(6)
        s.add(7)
        s.remove(4)
        assert s.check_contains(2) == True
        assert s.check_contains(4) == False
        assert s.check_contains(3) == True
        assert s.check_contains(1) == True
        assert s.check_contains(6) == True
        assert s.check_contains(7) == True