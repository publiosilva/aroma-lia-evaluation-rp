import org.junit.Test;
import static org.junit.Assert.*;
import java.util.UUID;

public class TestSmell096 {

    @Test
    public void testCreateUserAndServer() {
        waitForHub(apiRequest);

        // Create a new user
        String username = UUID.randomUUID().toString();
        apiRequest("post", "/hub/api/users", "{\"usernames\": [\"" + username + "\"]}");

        // Start a server for the user
        apiRequest("post", "/hub/api/users/" + username + "/server");

        // Wait for the server
        boolean ready = false;
        long now = System.currentTimeMillis();
        while (!ready) {
            String waitR = apiRequest("get", "/hub/api/users/" + username).json();
            if (waitR.get("servers").get("").get("ready").asBoolean()) {
                ready = true;
                break;
            }
            if (System.currentTimeMillis() - now > TIMEOUT) {
                throw new TimeoutException("Singleuser server did not start in " + TIMEOUT + " seconds");
            }
            try {
                Thread.sleep(5000);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        }

        // Call the jupyter-server API
        String serverR = apiRequest("get", "/user/" + username + "/api").json();
        assertTrue(serverR.contains("version"));
        String contentsR = apiRequest("get", "/user/" + username + "/api/contents").json();
        assertTrue(contentsR.contains("content"));
    }
}