import org.junit.Test;
import static org.junit.Assert.*;

public class TestSmell156 {
    
    @Test
    public void testHelloWorld() {
        Player p = Player.fromDescription("videotestsrc ! fakesink");
        p.play();
        try {
            Thread.sleep(5000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        p.stop();
    }
}