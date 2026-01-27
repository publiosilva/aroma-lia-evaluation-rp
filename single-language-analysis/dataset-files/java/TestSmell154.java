import org.junit.Test;
import static org.junit.Assert.*;

public class TestSmell154 {

    @Test
    public void testCancellation() {
        ImpaladService impalad = new ImpaladService(socket.getfqdn());
        impalad.waitForNumInFlightQueries(0);
        String command = "select sleep(10000);";
        Process p = _startNewShellProcess();
        _sendCmdToShell(p, command);
        try {
            Thread.sleep(1000);
            int shellPid = cancellationHelper();
            Thread.sleep(2000);
            Runtime.getRuntime().exec("kill -SIGINT " + shellPid);
            boolean result = getShellCmdResult(p);
            assertEquals(true, result);
            assertEquals(0, impalad.waitForNumInFlightQueries(0));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}