import org.junit.Test;
import static org.junit.Assert.*;

public class TestSmell123 {

    @Test
    public void testPinMustBeOpenedBeforeUseAndIsUnusableAfterBeingClosed() {
        Pin pin = Pins.pin(0);
        
        try {
            pin.value();
            fail("Expected IOError");
        } catch (IOException e) {
            // Expected exception
        }
        
        pin.open();
        try {
            pin.value();
        } finally {
            pin.close();
        }
        
        try {
            pin.value();
            fail("Expected IOError");
        } catch (IOException e) {
            // Expected exception
        }
    }
}