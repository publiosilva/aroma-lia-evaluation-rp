import org.junit.Test;
import static org.junit.Assert.*;
import java.util.List;

public class TestSmell095 {

    @Test
    public void testIdadfHeadProjected3col() {
        if (idadf.getColumns().length >= 4) {
            String[] columns = new String[]{idadf.getColumns()[1], idadf.getColumns()[2], idadf.getColumns()[3]};
            DataFrame newIdadf = idadf.get(columns);

            String sortKey = newIdadf.getColumns()[0];
            if (newIdadf.getNumericalColumns().length > 0) {
                sortKey = newIdadf.getNumericalColumns()[0];
            }

            DataFrame idaHead = newIdadf.head();

            DataFrame dfSorted = df.sortValues(sortKey);
            DataFrame dfHead = dfSorted.get(columns).head();

            assertTrue(idaHead instanceof DataFrame);
            assertEquals(5, idaHead.length());
            assertArrayEquals(dfHead.get(sortKey).toArray(), idaHead.get(sortKey).toArray());
        }
    }
}