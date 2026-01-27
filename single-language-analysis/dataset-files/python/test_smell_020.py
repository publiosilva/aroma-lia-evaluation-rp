import pytest

class TestPotionTest:
    @pytest.mark.skip
    def test_smell_020(self):
        Potion.set("survival", 0, False)  # Starting with no potions
        Potion.set("recovery", 0, False)  # Starting with no potions
        Potion.set("survival", 5, False)  # Set player's survival potion count to 5
        Potion.set("recovery", 5, False)  # Set player's recovery potion count to 5
        Potion.sp_used = 0  # Reset survival potion usage count
        Potion.rp_used = 0  # Reset recovery potion usage count

        assert Potion.sp_used == 0  # Check total survival potions that have been used in this test
        assert Potion.rp_used == 0  # Check total recovery potions that have been used in this test

        Potion.use("survival")
        Potion.use("survival")
        Potion.use("survival")
        Potion.use("recovery")
        Potion.use("recovery")

        assert Potion.sp_used == 3  # Check total survival potions that have been used
        assert Potion.rp_used == 2  # Check total recovery potions that have been used

        Potion.use("survival")
        Potion.use("survival")
        Potion.use("recovery")
        Potion.use("recovery")
        Potion.use("recovery")

        assert Potion.sp_used == 5  # Check total survival potions that have been used
        assert Potion.rp_used == 5  # Check total recovery potions that have been used

        Potion.use("survival")
        Potion.use("recovery")

        assert Potion.sp_used == 5  # Check total survival potions that have been used after using all potions
        assert Potion.rp_used == 5  # Check total recovery potions that have been used after using all potions