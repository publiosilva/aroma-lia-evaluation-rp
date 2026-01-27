const { expect } = require('jest');

describe('PotionTest', () => {
    test.skip("test_smell_020", () => {
        Potion.set("survival", 0, false); // Starting with no potions
        
        Potion.set("recovery", 0, false); // Starting with no potions
        
        Potion.set("survival", 5, false); // Set player\'s survival potion count to 5
        
        Potion.set("recovery", 5, false); // Set player\'s recovery potion count to 5
        
        Potion.spUsed = 0; // Reset survival potion usage count
        
        Potion.rpUsed = 0; // Reset recovery potion usage count

        expect(Potion.spUsed).toBe(0); // Check total survival potions that have been used in this test
        
        expect(Potion.rpUsed).toBe(0); // Check total recovery potions that have been used in this test

        // Test that using a potion increments the total used
        Potion.use("survival");
        
        Potion.use("survival");
        
        Potion.use("survival");
        
        Potion.use("recovery");
        
        Potion.use("recovery");

        expect(Potion.spUsed).toBe(3); // Check total survival potions that have been used
        
        expect(Potion.rpUsed).toBe(2); // Check total recovery potions that have been used
        
        // Deplete potions again
        Potion.use("survival");
        
        Potion.use("survival");
        
        Potion.use("recovery");
        
        Potion.use("recovery");
        
        Potion.use("recovery");

        expect(Potion.spUsed).toBe(5); // Check total survival potions that have been used
        
        expect(Potion.rpUsed).toBe(5); // Check total recovery potions that have been used

        // Attempt to use nonexistant potions
        Potion.use("survival");
        
        Potion.use("recovery");

        expect(Potion.spUsed).toBe(5); // Check total survival potions that have been used after using all potions
        
        expect(Potion.rpUsed).toBe(5); // Check total recovery potions that have been used after using all potions
    });
});