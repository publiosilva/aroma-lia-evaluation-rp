import org.junit.Test;
import static org.junit.Assert.*;

public class TestSmell108 {

    @Test
    public void testCanSetDirectionOnConstruction() {
        assertEquals(Out, Pins.pin(0, Out).direction);
        assertFalse(new java.io.File("/sys/class/gpio/gpio17/direction").exists());
        
        try (Pin pin = Pins.pin(0, Out)) {
            assertEquals("out\n", contentOf("/sys/class/gpio/gpio17/direction"));
            assertEquals(Out, pin.direction);
        }
    }
}