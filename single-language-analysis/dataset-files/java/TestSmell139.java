import org.junit.Test;
import static org.junit.Assert.*;

public class TestSmell139 {

    @Test
    public void testPluginLoadingAndUsage() {
        ThreadSafeScheduler scheduler = new ThreadSafeScheduler();
        List<String> results = new ArrayList<>();
        
        scheduler.loadPlugin("p1", results::add);
        
        scheduler.schedule("jobp", () -> scheduler.getPlugins().get("p1").accept("ok"), 1);
        scheduler.scheduleOneOff("onep", () -> scheduler.getPlugins().get("p1").accept("ok"), 
            LocalDateTime.now().plusSeconds(1));
        
        try {
            Thread.sleep(1100);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
        
        scheduler.runPending();
        
        try {
            Thread.sleep(100);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
        
        assertEquals(2, Collections.frequency(results, "ok"));
    }
}