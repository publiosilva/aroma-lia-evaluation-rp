import org.junit.Test;
import static org.junit.Assert.*;

public class TestSmell153 {

    @Test
    public void testRecurringAndCancelAndReschedule() {
        Response rv = client.post("/jobs/recurring", json("{\"interval\": 0.1, \"sla_jitter\": 0, \"func\": \"y\"}"));
        String jid = rv.getJson().get("job_id").asText();
        try {
            Thread.sleep(300);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        Response rv2 = client.delete("/jobs/" + jid + "/cancel");
        assertEquals(200, rv2.getStatusCode());
        Response rv3 = client.post("/jobs/" + jid + "/reschedule", json("{\"interval\": 0.05}"));
        assertEquals(200, rv3.getStatusCode());
        JsonNode data = rv3.getJson();
        assertEquals(jid, data.get("rescheduled").asText());
        assertEquals(0.05, data.get("new_interval").asDouble(), 0.0);
    }
}