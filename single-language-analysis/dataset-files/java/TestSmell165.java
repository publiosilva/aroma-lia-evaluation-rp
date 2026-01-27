import org.junit.Test;
import static org.junit.Assert.*;

public class TestSmell165 {

    @Test
    public void testConstructionFromNone() {
        try {
            Path(null);
        } catch (TypeError e) {
            // expected
        } catch (Exception e) {
            throw new RuntimeException("DID NOT RAISE");
        }
    }
}