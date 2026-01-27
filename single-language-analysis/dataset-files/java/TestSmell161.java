import org.junit.Test;
import static org.junit.Assert.*;

public class TestSmell161 {

    @Test
    public void testMain() {
        String[] argv = {"gpustat"};
        System.setProperty("java.util.Arrays", String.join(",", argv));
        gpustat.main();
    }
}