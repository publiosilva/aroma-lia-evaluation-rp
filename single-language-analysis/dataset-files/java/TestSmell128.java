import org.junit.Test;
import static org.junit.Assert.*;

public class TestSmell128 {

    @Test
    public void testDirectionAndValueOfPinIsResetWhenClosed() {
        try (Pin pin = pins.pin(0, Out)) {
            pin.setValue(1);
        }

        gpioAdmin("export", 17, PullDown);
        try {
            assertEquals("0\n", contentOf("/sys/class/gpio/gpio17/value"));
            assertEquals("in\n", contentOf("/sys/class/gpio/gpio17/direction"));
        } finally {
            gpioAdmin("unexport", 17);
        }
    }
}