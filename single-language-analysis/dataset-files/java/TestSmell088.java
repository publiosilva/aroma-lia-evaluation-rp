import org.junit.Test;
import static org.junit.Assert.*;

public class TestSmell088 extends BaseTestRunner {

    @Test
    public void testAlertnotifyValidFuncWithoutErrors() {
        class CorrectFakePoller extends FakePoller {
            @alertnotify(exceptions = {Exception.class})
            public void validFunc() {
                // 
            }
        }

        CorrectFakePoller poller = new CorrectFakePoller();
        assertEquals(false, poller.hasAlertnotify);
        Object result = poller.validFunc();
        assertEquals(null, result);
    }
}