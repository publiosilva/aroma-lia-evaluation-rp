import pytest

class TestBankTest:
    def test_smell_027(self):
        account1 = Account("Name", "001", Money(10, 0))
        _bank.add_account(account1)
        
        account2 = _bank.search("001")
        
        account2.deposit(Money(10, 0))
        
        assert _bank.search("001").to_string() == "Name, 001, $10.00"
        
        account1.deposit(Money(10, 0))
        
        assert _bank.search("001").to_string() == "Name, 001, $10.00"