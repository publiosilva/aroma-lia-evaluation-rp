import { expect } from '@jest/globals';

describe('UhuTest', () => {
  test("test_smell_046", () => {
    const a: I_a = new Uhu();
    let food: string = "";
    let foodListCorrect: boolean = true;
    let bad: string = "";

    for (let i = 0; i < DIET_ITEMS.length; i++) {
      food = DIET_ITEMS[i];
      try {
        a.eat(food);
      } catch (e) {
        if (e instanceof FishFoodException) {
          foodListCorrect = false;
          bad = food;
        } else if (e instanceof FishSizeException) {
          // do nothing food ok but fish got too big
        }
      }
    }

    expect(foodListCorrect).toBe(true, "Fish diet items are not correct. " + bad + " is not a diet item");
  });
});