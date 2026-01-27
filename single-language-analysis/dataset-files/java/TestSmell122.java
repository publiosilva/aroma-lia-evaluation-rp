import org.junit.Test;
import static org.junit.Assert.*;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class TestSmell122 {

    @Test
    public void testThreadSafety() {
        List<String> errors = new ArrayList<>();

        Runnable cb = new Runnable() {
            @Override
            public void run() {
                try {
                    Thread.sleep(1e-3);
                    int r = module.t(() -> 123);
                    assertEquals(123, r);
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
            }
        };

        Runnable runner = new Runnable() {
            @Override
            public void run() {
                try {
                    for (int j = 0; j < 50; j++) {
                        int r = module.t(cb);
                        assertEquals(42, r);
                        checkFunction("t");
                    }
                } catch (Exception e) {
                    errors.add(e.toString());
                }
            }
        };

        ExecutorService executor = Executors.newFixedThreadPool(20);
        for (String arg : new String[]{"t", "t2"}) {
            for (int n = 0; n < 20; n++) {
                executor.submit(runner);
            }
        }
        executor.shutdown();
        while (!executor.isTerminated()) {}

        String errorMessages = String.join("\n\n", errors);
        if (!errorMessages.isEmpty()) {
            throw new AssertionError(errorMessages);
        }
    }
}