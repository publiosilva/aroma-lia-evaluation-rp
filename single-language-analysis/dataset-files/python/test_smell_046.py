import pytest

class TestUhu:
    def test_smell_046(self):
        a = Uhu()
        food = ""
        food_list_correct = True
        bad = ""
        for i in range(len(DIET_ITEMS)):
            food = DIET_ITEMS[i]
            try:
                a.eat(food)
            except FishFoodException as fe:
                food_list_correct = False
                bad = food
            except FishSizeException as fs:
                pass
        
        assert food_list_correct, "Fish diet items are not correct. " + bad + " is not a diet item"