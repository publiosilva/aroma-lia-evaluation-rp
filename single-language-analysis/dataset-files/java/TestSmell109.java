import org.junit.Test;
import static org.junit.Assert.*;

public class TestSmell109 {

    @Test
    public void testAstypeNonNanoTzNaive() {
        Object dti = pd.date_range("2016-01-01", 3);

        Object res = dti.astype("M8[s]");
        assertEquals("M8[s]", res.dtype);

        Object dta = dti._data;
        res = dta.astype("M8[s]");
        assertEquals("M8[s]", res.dtype);
        assertTrue(res instanceof pd.core.arrays.DatetimeArray);
    }
}