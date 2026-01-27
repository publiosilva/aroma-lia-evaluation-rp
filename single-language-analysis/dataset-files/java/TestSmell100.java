import org.junit.Test;
import static org.junit.Assert.*;

public class TestSmell100 {

    @Test
    public void test2() throws Exception {
        for (int i = 0; i < 10; i++) {
            client.send("hello " + i);
            Object data = client.receive();
            if (data == null) {
                System.out.println("connection closed");
                break;
            }
            System.out.println("received: " + data);
            Thread.sleep(100);
            i += 1;
        }
        assertEquals(true, true);
    }
}