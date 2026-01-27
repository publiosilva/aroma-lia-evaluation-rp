import org.junit.Test;
import static org.junit.Assert.*;

public class TestSmell089 {

    @Test
    public void testAstypeNonNanoTzaware() {
        Object dti = pd.date_range("2016-01-01", 3, "UTC");

        Object res = dti.astype("M8[s, US/Pacific]");
        assertEquals("M8[s, US/Pacific]", res.dtype);

        Object dta = dti._data;
        res = dta.astype("M8[s, US/Pacific]");
        assertEquals("M8[s, US/Pacific]", res.dtype);

        Object res2 = res.astype("M8[s, UTC]");
        assertEquals("M8[s, UTC]", res2.dtype);
        assertFalse(tm.shares_memory(res2, res));

        Object res3 = res.astype("M8[s, UTC]", false);
        assertEquals("M8[s, UTC]", res2.dtype);
        assertTrue(tm.shares_memory(res3, res));
    }
}