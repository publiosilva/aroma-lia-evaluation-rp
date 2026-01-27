using Xunit;

public class TestSmell046
{
    [Fact]
    public void EatingDietTest()
    {
        I_a a = new Uhu();
        string food = "";
        bool foodListCorrect = true;
        string bad = "";
        for (int i = 0; i < DIET_ITEMS.Length; i++)
        {
            food = DIET_ITEMS[i];
            try
            {
                a.Eat(food);
            }
            catch (FishFoodException fe)
            {
                foodListCorrect = false;
                bad = food;
            }
            catch (FishSizeException fs)
            {
                // do nothing food ok but fish got too big
            }
        }
        Assert.True(foodListCorrect, "Fish diet items are not correct. " + bad + " is not a diet item");
    }
}