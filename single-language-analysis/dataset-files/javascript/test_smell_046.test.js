const { expect } = require('jest');

describe('UhuTest', () => {
  test("test_smell_046", () => {
    const a = new Uhu();
    let food = "";
    let foodListCorrect = true;
    let bad = "";
    for (let i = 0; i < DIET_ITEMS.length; i++) {
      food = DIET_ITEMS[i];
      try {
        a.eat(food);
      } catch (e) {
        if (e instanceof FishFoodException) {
          foodListCorrect = false;
          bad = food;
        } else if (e instanceof FishSizeException) {
          // empty
        }
      }
    }

    expect(foodListCorrect).toBe(true, "Fish diet items are not correct. " + bad + " is not a diet item");
  });
});