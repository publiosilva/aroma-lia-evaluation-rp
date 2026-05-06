import org.junit.Test;
import org.junit.Ignore;
import static org.junit.Assert.*;

public class TestSmell133 {

    @Ignore("5 seconds is also too long")
    @Test
    public void testPrimesParallel() {
        long t0 = System.currentTimeMillis();
        boolean[][] results = checkNumbersPrimeConcurrently();
        int count = 0;
        for (boolean[] result : results) {
            if (result[1]) {
                count++;
            }
        }
        double deltaTime = (System.currentTimeMillis() - t0) / 1000.0;
        assertEquals(112, count);
        assertTrue(deltaTime < 5);
    }
}