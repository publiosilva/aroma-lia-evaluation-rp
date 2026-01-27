import pytest

class TestQueue:
    def test_smell_068(self):
        self.set_up()
        assert q1.equals(q1)
        assert not q1.equals(str("A B C D E F G H I J K L"))
        
        for i in range(9):
            q1.dequeue()
        
        print(q1)
        test = Queue()
        test.enqueue(str("J"))
        test.enqueue(str("K"))
        test.enqueue(str("L"))
        assert q1.equals(test)
        test.dequeue()
        assert not q1.equals(test)
        
        test2 = Queue([1.1, 2.2, 3.2, 4.4])
        assert not test2.equals(q3)
        assert not test2.equals(test)

    def set_up(self):
        pass