// Original URL: https://github.com/ICSatKCC/a6-lawa-i-fishing-game-f23-g4_f23_a6/blob/71a87ba82a51202deb39bc625d80350912af1dbb/UhuTest.java#L117-L137

public class TestSmell046 {
   @Test public void eatingDietTest(){
      I_a a = new Uhu();
      String food = "";
      boolean foodListCorrect = true;
      String bad = "";
      for(int i = 0; i < DIET_ITEMS.length; i++){
         food = DIET_ITEMS[i];
         try{
            a.eat(food);
         } catch(FishFoodException fe) {
            foodListCorrect = false;
            bad = food;
         } catch(FishSizeException fs) {
            //do nothing food ok but fish got too big
         }
      
      }
      Assert.assertTrue("Fish diet items are not correct. " + bad 
         + " is not a diet item", foodListCorrect);

   } //eating test
}
