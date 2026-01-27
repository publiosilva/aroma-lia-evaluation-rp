import pytest

class TestMainTest:
    def test_smell_007(self):
        result = Main.to_do_the_operation(Main.recognize("10-10-10-10"))
        assert result == "-20.0"
        result = Main.to_do_the_operation(Main.recognize("0-0"))
        assert result == "0.0"
        result = Main.to_do_the_operation(Main.recognize("10-10-10-20"))
        assert result == "-30.0"
        result = Main.to_do_the_operation(Main.recognize("1-1"))
        assert result == "0.0"
        result = Main.to_do_the_operation(Main.recognize("10-10-10-10-10-10-10-10-10-10-10-10"))
        assert result == "-100.0"
        result = Main.to_do_the_operation(Main.recognize("0-25-25-25"))
        assert result == "-75.0"