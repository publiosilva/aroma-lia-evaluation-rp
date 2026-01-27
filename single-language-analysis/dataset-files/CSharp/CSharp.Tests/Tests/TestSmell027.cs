using Xunit;

public class TestSmell027
{
    [Fact]
    public void TestPrivacyLeak()
    {
        // Test search
        Account account1 = new Account("Name", "001", new Money(10, 0));
        _bank.AddAccount(account1);
        
        Account account2 = _bank.Search("001");
        
        account2.Deposit(new Money(10, 0));
        
        Assert.True(_bank.Search("001").ToString().Equals("Name, 001, $10.00"), "Error in TestPrivacyLeak");
        
        // Test addAccount
        
        account1.Deposit(new Money(10, 0));
        
        Assert.True(_bank.Search("001").ToString().Equals("Name, 001, $10.00"), "Error in TestPrivacyLeak");
    }
}