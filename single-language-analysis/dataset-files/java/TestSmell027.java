// Original URL: https://github.com/Afrah-Rahim/Money1/blob/5e9fe90849f27596efdbfe38185adcac6efab5c5/BankTest.java#L155-L174

public class TestSmell027 {
    @Test
    public void testPrivacyLeak()
    {
        //Test search
        Account account1 = new Account("Name", "001", new Money (10, 0));
        _bank.addAccount(account1);
        
        Account account2 = _bank.search("001");
        
        account2.deposit(new Money(10, 0));
        
        assertTrue("Error in testPrivacyLeak", _bank.search("001").toString().equals("Name, 001, $10.00"));
        
        //Test addAccount
        
        account1.deposit(new Money(10, 0));
        
        assertTrue("Error in testPrivacyLeak", _bank.search("001").toString().equals("Name, 001, $10.00"));
    }
}
