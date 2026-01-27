import org.junit.Test;
import static org.junit.Assert.*;
import java.util.Arrays;

public class TestSmell101 {

    @Test
    public void testAstypeCopies() {
        String[] dtypes = {"datetime64[ns]", "datetime64[ns, UTC]"};
        String[] others = {"datetime64[ns]", "datetime64[ns, UTC]", "datetime64[ns, CET]"};

        for (String dtype : dtypes) {
            for (String other : others) {
                Series ser = new Series(Arrays.asList(1, 2), dtype);
                Series orig = ser.copy();

                boolean err = false;
                if ((dtype.equals("datetime64[ns]") && !other.equals("datetime64[ns]")) || 
                    (!dtype.equals("datetime64[ns]") && other.equals("datetime64[ns]"))) {
                    err = true;
                }

                if (err) {
                    String msg;
                    if (dtype.equals("datetime64[ns]")) {
                        msg = "Use obj.tz_localize instead or series.dt.tz_localize instead";
                    } else {
                        msg = "from timezone-aware dtype to timezone-naive dtype";
                    }
                    try {
                        ser.astype(other);
                        fail("Expected TypeError not thrown");
                    } catch (TypeError e) {
                        assertEquals(msg, e.getMessage());
                    }
                } else {
                    Series t = ser.astype(other);
                    t.fillNaT();
                    assertSeriesEqual(ser, orig);
                }
            }
        }
    }

    private void assertSeriesEqual(Series expected, Series actual) {
        // Implement the logic to assert that two Series are equal
    }
}