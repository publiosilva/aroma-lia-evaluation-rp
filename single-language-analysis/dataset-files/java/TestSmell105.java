import org.junit.Test;
import static org.junit.Assert.*;

public class TestSmell105 {

    @Test
    public void testLru() {
        String storage = "file"; // Change this to "memory" for the other case
        String filepath = storage.equals("memory") ? null : "tmpdir/cache";
        Cache cache = new Cache(filepath, 2, -1, "LRU");

        Function<Integer, Integer> func = a -> a;

        assertEquals(1, func.apply(1).intValue());
        assertEquals(2, func.apply(2).intValue());
        List<Integer> theKeys = cache.items().stream()
            .map(entry -> entry.getKey().getValue())
            .collect(Collectors.toList());
        assertEquals(2, theKeys.size());
        assertTrue(theKeys.contains(1));
        assertTrue(theKeys.contains(2));

        assertEquals(1, func.apply(1).intValue());
        assertEquals(3, func.apply(3).intValue());
        theKeys = cache.items().stream()
            .map(entry -> entry.getKey().getValue())
            .collect(Collectors.toList());
        assertEquals(2, theKeys.size());
        assertTrue(theKeys.contains(1));
        assertTrue(theKeys.contains(3));
        assertFalse(theKeys.contains(2));
    }
}