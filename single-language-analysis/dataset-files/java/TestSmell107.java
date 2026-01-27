import org.junit.Test;
import static org.junit.Assert.*;

public class TestSmell107 {

    @Test
    public void testLfu() {
        String storage = "file"; // Change this to "memory" for the other case
        String filePath = storage.equals("memory") ? null : "tmpdir/cache";
        Cache cache = new Cache(filePath, 2, -1, "LFU");

        Function<Integer, Integer> func = a -> a;

        assertEquals(1, func.apply(1).intValue());
        assertEquals(2, func.apply(2).intValue());
        List<Integer> theKeys = cache.items().stream()
            .map(entry -> entry.getKey().getSecond())
            .collect(Collectors.toList());
        assertEquals(2, theKeys.size());
        assertTrue(theKeys.contains(1));
        assertTrue(theKeys.contains(2));

        assertEquals(1, func.apply(1).intValue());
        assertEquals(1, func.apply(1).intValue());
        assertEquals(2, func.apply(2).intValue());
        assertEquals(2, func.apply(2).intValue());
        assertEquals(3, func.apply(3).intValue());
        theKeys = cache.items().stream()
            .map(entry -> entry.getKey().getSecond())
            .collect(Collectors.toList());
        assertEquals(2, theKeys.size());
        assertTrue(theKeys.contains(1));
        assertTrue(theKeys.contains(2));
        assertFalse(theKeys.contains(3));
    }
}