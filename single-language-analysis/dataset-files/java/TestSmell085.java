import org.junit.Test;
import static org.junit.Assert.*;

public class TestSmell085 {

    @Test
    public void testCacheSetGetInClearDel() {
        for (Object[] entry : keysAndValues) {
            Object key = entry[0];
            Object value = entry[1];

            try {
                cache.get(key);
                fail("Expected KeyError");
            } catch (KeyError e) {
                // Expected exception
            }

            cache.put(key, value);
            assertEquals(value, cache.get(key));

            cache.put(key, value);
            assertEquals(value, cache.get(key));
            assertTrue(cache.containsKey(key));
            assertFalse(cache.containsKey(-999));

            cache.clear();
            assertNull(cache.get(key));

            cache.put(key, value);
            assertEquals(value, cache.get(key));

            cache.remove(key);
            assertNull(cache.get(key));

            try {
                cache.remove(key);
                fail("Expected KeyError");
            } catch (KeyError e) {
                // Expected exception
            }
        }
    }
}