import org.junit.Test;
import static org.junit.Assert.*;
import static org.mockito.Mockito.*;

public class TestSmell110 {

    @Test
    public void testMethodHasCommand() {
        try {
            Poller poller = mock(Poller.class);
            when(poller.poll()).thenReturn(null);
            
            poller = new Poller(this.rpcProxy);
            assertEquals(false, poller.hasBlocknotify());
            assertEquals(false, poller.hasWalletnotify());
            assertEquals(false, poller.hasAlertnotify());

            poller = new Poller(this.rpcProxy, new HashMap<String, String>() {{
                put("blocknotify", "echo \"%s\"");
            }});
            assertEquals(true, poller.hasBlocknotify());
            assertEquals(false, poller.hasWalletnotify());
            assertEquals(false, poller.hasAlertnotify());

            poller = new Poller(this.rpcProxy, new HashMap<String, String>() {{
                put("walletnotify", "echo \"%s\"");
            }});
            assertEquals(false, poller.hasBlocknotify());
            assertEquals(true, poller.hasWalletnotify());
            assertEquals(false, poller.hasAlertnotify());

            poller = new Poller(this.rpcProxy, new HashMap<String, String>() {{
                put("alertnotify", "echo \"%s\"");
            }});
            assertEquals(false, poller.hasBlocknotify());
            assertEquals(false, poller.hasWalletnotify());
            assertEquals(true, poller.hasAlertnotify());

            poller = new Poller(this.rpcProxy, new HashMap<String, String>() {{
                put("blocknotify", "echo \"%s\"");
                put("walletnotify", "echo \"%s\"");
                put("alertnotify", "echo \"%s\"");
            }});
            assertEquals(true, poller.hasBlocknotify());
            assertEquals(true, poller.hasWalletnotify());
            assertEquals(true, poller.hasAlertnotify());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}