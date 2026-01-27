import org.junit.Test;
import static org.junit.Assert.*;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.firefox.FirefoxOptions;

public class TestSmell166 {

    @Test
    public void testBasicOptions() {
        FirefoxOptions options = new FirefoxOptions();
        FirefoxDriver driver = new FirefoxDriver(options);
        
        driver.quit();
    }
}