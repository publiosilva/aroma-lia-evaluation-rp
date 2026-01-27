import org.junit.Test;
import static org.junit.Assert.*;

public class TestSmell106 {

    @Test
    public void testOnlyOnErrors() {
        int x = 2;
        int callCount = 0;
        boolean raised = false;
        int n = 0;

        Cache cache = new Cache(onlyOnErrors = new Class[]{ZeroDivisionError.class, ConnectionError.class});
        
        Runnable fn = new Runnable() {
            public int run() {
                callCount++;
                try {
                    return 0 / x;
                } catch (ZeroDivisionError e) {
                    raised = true;
                    throw e;
                } finally {
                    n++;
                    x--;
                }
            }
        };

        assertEquals(1, fn.run());
        assertEquals(1, callCount);
        assertEquals(2, fn.run());
        assertEquals(2, callCount);
        assertEquals(0, x);
        assertEquals(2, fn.run());
        assertEquals(3, callCount);
        assertTrue(raised);
        assertEquals(2, fn.run());
        x = 1;
        raised = false;
        assertEquals(3, fn.run());
        assertEquals(5, callCount);
        assertEquals(3, fn.run());
        assertTrue(raised);
        assertEquals(6, callCount);
        fn._cache.clear();
        try {
            fn.run();
            fail("Expected ZeroDivisionError");
        } catch (ZeroDivisionError e) {
            // Expected exception
        }
    }
}