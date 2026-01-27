// Original URL: https://github.com/hhaslam11/Text-Fighter/blob/ae0fe3e4fba1e8ebb880a2ab0572069b21e8618f/src/com/hotmail/kalebmarc/textfighter/player/PotionTest.java#L266-L324

public class TestSmell020 {
	@Ignore
	@Test
	public void testUsedAlone() {
		
		Potion.set("survival", 0, false); // Starting with no potions
		
		Potion.set("recovery", 0, false); // Starting with no potions
		
		Potion.set("survival", 5, false); // Set player's survival potion count to 5
		
		Potion.set("recovery", 5, false); // Set player's recovery potion count to 5
		
		Potion.spUsed = 0; // Reset survival potion usage count
		
		Potion.rpUsed = 0; // Reset recovery potion usage count

		assertEquals(0, Potion.spUsed); // Check total survival potions that have been used in this test
		
		assertEquals(0, Potion.rpUsed); // Check total recovery potions that have been used in this test

		// Test that using a potion increments the total used
		Potion.use("survival");
		
		Potion.use("survival");
		
		Potion.use("survival");
		
		Potion.use("recovery");
		
		Potion.use("recovery");

		assertEquals(3, Potion.spUsed); // Check total survival potions that have been used
		
		assertEquals(2, Potion.rpUsed); // Check total recovery potions that have been used
		
		// Deplete potions again
		Potion.use("survival");
		
		Potion.use("survival");
		
		Potion.use("recovery");
		
		Potion.use("recovery");
		
		Potion.use("recovery");

		assertEquals(5, Potion.spUsed); // Check total survival potions that have been used
		
		assertEquals(5, Potion.rpUsed); // Check total recovery potions that have been used

		// Attempt to use nonexistant potions
		Potion.use("survival");
		
		Potion.use("recovery");

		assertEquals(5, Potion.spUsed); // Check total survival potions that have been used after using all potions
		
		assertEquals(5, Potion.rpUsed); // Check total recovery potions that have been used after using all potions
	}
}
