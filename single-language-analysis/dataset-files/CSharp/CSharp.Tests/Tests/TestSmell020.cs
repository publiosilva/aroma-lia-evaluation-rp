using Xunit;

public class TestSmell020
{
    [Fact(Skip = "")]
    public void TestUsedAlone()
    {
        Potion.Set("survival", 0, false); // Starting with no potions
        
        Potion.Set("recovery", 0, false); // Starting with no potions
        
        Potion.Set("survival", 5, false); // Set player's survival potion count to 5
        
        Potion.Set("recovery", 5, false); // Set player's recovery potion count to 5
        
        Potion.SpUsed = 0; // Reset survival potion usage count
        
        Potion.RpUsed = 0; // Reset recovery potion usage count

        Assert.Equal(0, Potion.SpUsed); // Check total survival potions that have been used in this test
        
        Assert.Equal(0, Potion.RpUsed); // Check total recovery potions that have been used in this test

        // Test that using a potion increments the total used
        Potion.Use("survival");
        
        Potion.Use("survival");
        
        Potion.Use("survival");
        
        Potion.Use("recovery");
        
        Potion.Use("recovery");

        Assert.Equal(3, Potion.SpUsed); // Check total survival potions that have been used
        
        Assert.Equal(2, Potion.RpUsed); // Check total recovery potions that have been used
        
        // Deplete potions again
        Potion.Use("survival");
        
        Potion.Use("survival");
        
        Potion.Use("recovery");
        
        Potion.Use("recovery");
        
        Potion.Use("recovery");

        Assert.Equal(5, Potion.SpUsed); // Check total survival potions that have been used
        
        Assert.Equal(5, Potion.RpUsed); // Check total recovery potions that have been used

        // Attempt to use nonexistant potions
        Potion.Use("survival");
        
        Potion.Use("recovery");

        Assert.Equal(5, Potion.SpUsed); // Check total survival potions that have been used after using all potions
        
        Assert.Equal(5, Potion.RpUsed); // Check total recovery potions that have been used after using all potions
    }
}