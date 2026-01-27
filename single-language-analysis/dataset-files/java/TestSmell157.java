import org.junit.Test;
import static org.junit.Assert.*;
import java.util.concurrent.TimeUnit;

public class TestSmell157 {

    @Test
    public void testPriorityOrdering() {
        // First request with MEDIUM priority
        Response response1 = client.post(
            "/ingest",
            new JsonObject().add("ids", new JsonArray().add(1).add(2).add(3).add(4).add(5)).add("priority", "MEDIUM")
        );
        String ingestionId1 = response1.json().getString("ingestion_id");
        
        // Second request with HIGH priority
        Response response2 = client.post(
            "/ingest",
            new JsonObject().add("ids", new JsonArray().add(6).add(7).add(8).add(9)).add("priority", "HIGH")
        );
        String ingestionId2 = response2.json().getString("ingestion_id");
        
        // Wait for some processing
        try {
            Thread.sleep(6);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        
        // Check status of both requests
        Response status1 = client.get("/status/" + ingestionId1);
        Response status2 = client.get("/status/" + ingestionId2);
        
        // HIGH priority request should have more completed batches
        int completedBatches1 = 0;
        for (JsonObject batch : status1.json().getJsonArray("batches").getValuesAs(JsonObject.class)) {
            if (batch.getString("status").equals(BatchStatus.COMPLETED)) {
                completedBatches1++;
            }
        }
        
        int completedBatches2 = 0;
        for (JsonObject batch : status2.json().getJsonArray("batches").getValuesAs(JsonObject.class)) {
            if (batch.getString("status").equals(BatchStatus.COMPLETED)) {
                completedBatches2++;
            }
        }
        
        assertEquals(true, completedBatches2 >= completedBatches1);
    }
}