import org.junit.Test;
import static org.junit.Assert.*;

public class TestSmell140 {

    @Test
    public void testStringCallback() {
        Object f = this.module.getClass().getMethod("string_callback").invoke(this.module);
        int r = (int) f.invoke((String code) -> {
            if (code.equals("r")) {
                return 0;
            } else {
                return 1;
            }
        });
        assertEquals(0, r);
    }
}