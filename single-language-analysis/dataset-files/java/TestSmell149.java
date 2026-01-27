import org.junit.Test;
import static org.junit.Assert.*;

public class TestSmell149 {

    @Test
    public void testWebview() {
        driver.findElementByXPath("//*[@text='交易']").click();
        for (int i = 0; i < 5; i++) {
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            System.out.println(driver.getContexts());
        }
        driver.findElementByAccessibilityId("A股开户").click();
    }
}