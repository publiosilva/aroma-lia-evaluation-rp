const { expect } = require('jest');

describe('BankTest', () => {
    it("test_smell_027", () => {
        // Test search
        const account1 = new Account("Name", "001", new Money(10, 0));
        _bank.addAccount(account1);
        
        const account2 = _bank.search("001");
        
        account2.deposit(new Money(10, 0));
        
        expect(_bank.search("001").toString()).toBe("Name, 001, $10.00");
        
        // Test addAccount
        
        account1.deposit(new Money(10, 0));
        
        expect(_bank.search("001").toString()).toBe("Name, 001, $10.00");
    });
});