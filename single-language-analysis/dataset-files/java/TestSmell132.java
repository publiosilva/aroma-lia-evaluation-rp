import org.junit.Test;
import static org.junit.Assert.*;
import pandas.core.frame.DataFrame;

public class TestSmell132 {

    @Disabled("tail on sorted dataframe fails in general, needs fixing first")
    @Test
    public void testIdadfTailSorted() {

        int sortIdx = df.getColumns().length - 1;
        String sortKey = idadf.getColumns()[sortIdx];
        DataFrame newIdadf = idadf.sort(sortKey);
        DataFrame idaTail = newIdadf.tail();

        DataFrame dfTail = df.sortValues(sortKey).tail();

        assertTrue(newIdadf.internalState.getState().contains(" ORDER BY "));
        assertTrue(idaTail instanceof DataFrame);
        assertEquals(5, idaTail.length());
        assertArrayEquals(dfTail.getColumn(sortKey).toArray(), idaTail.getColumn(sortKey).toArray());
    }
}