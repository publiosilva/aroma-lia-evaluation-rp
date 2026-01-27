// Original URL: https://github.com/elsabnilsson/lab1/blob/6cb40dfe2873d0912b7c307f2f873c3689f6a802/CarTest.java#L125-L132

public class TestSmell060 {
    @Test
    void decrementSpeed() {
        Volvo240 volvo240 = new Volvo240(0,0);
        volvo240.startEngine();
        volvo240.decrementSpeed(0.01);
        double delta = 0.0001;
        assertEquals(0.0875, volvo240.getCurrentSpeed(), delta);
    }
}
