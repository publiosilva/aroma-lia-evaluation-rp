import org.junit.Test;
import static org.junit.Assert.*;
import pandas.core.frame.DataFrame;

public class TestSmell141 {

    @Test
    public void testIdadfHead10() {
        DataFrame idaHead = idadf.head(10);
        assertTrue(idaHead instanceof DataFrame);
        assertEquals(10, idaHead.length());
    }
}