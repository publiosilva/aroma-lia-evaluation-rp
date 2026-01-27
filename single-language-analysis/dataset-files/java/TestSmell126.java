import org.junit.Test;
import static org.junit.Assert.*;

public class TestSmell126 {

    @Test
    public void testIntegerOverflow() {
        try {
            project10.lex("12345678");
            assertFalse(true);
        } catch (Exception e) {
        }
    }
}