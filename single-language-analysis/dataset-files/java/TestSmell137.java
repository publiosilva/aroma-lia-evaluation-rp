import org.junit.Test;
import org.junit.Ignore;
import static org.junit.Assert.*;

public class TestSmell137 {

    @Test
    @Ignore("Disabled on non-64-bit environments")
    public void testFrameToJsonFloatPrecision() {
        double value = 0.95;
        int precision = 1;
        String expectedVal = "1.0";
        DataFrame df = new DataFrame(new Object[][]{{value}});
        String encoded = df.toJson(precision);
        assertEquals(expectedVal, encoded);

        value = 1.95;
        expectedVal = "2.0";
        df = new DataFrame(new Object[][]{{value}});
        encoded = df.toJson(precision);
        assertEquals(expectedVal, encoded);

        value = -1.95;
        expectedVal = "-2.0";
        df = new DataFrame(new Object[][]{{value}});
        encoded = df.toJson(precision);
        assertEquals(expectedVal, encoded);

        value = 0.995;
        precision = 2;
        expectedVal = "1.0";
        df = new DataFrame(new Object[][]{{value}});
        encoded = df.toJson(precision);
        assertEquals(expectedVal, encoded);

        value = 0.9995;
        precision = 3;
        expectedVal = "1.0";
        df = new DataFrame(new Object[][]{{value}});
        encoded = df.toJson(precision);
        assertEquals(expectedVal, encoded);

        value = 0.99999999999999944;
        precision = 15;
        expectedVal = "1.0";
        df = new DataFrame(new Object[][]{{value}});
        encoded = df.toJson(precision);
        assertEquals(expectedVal, encoded);
    }
}