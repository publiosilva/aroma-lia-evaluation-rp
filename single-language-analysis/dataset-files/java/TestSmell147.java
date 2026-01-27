import org.junit.Test;
import static org.junit.Assert.*;
import java.util.HashMap;
import java.util.Map;

public class TestSmell147 {

    @Test
    public void testPredictNegativeText() {
        Map<String, String> data = new HashMap<>();
        data.put("text", "I hate this product!");

        // Send POST request
        Response response = requests.post(BASE_URL, data, headers);

        // Print raw response for debugging
        System.out.println("Response: " + response.text());

        // Check status code
        assertEquals(200, response.statusCode());

        // Check JSON response
        Map<String, Object> responseJson = response.json();
        assertTrue(responseJson.containsKey("predicted_label"), "Response missing 'predicted_label'");
        assertTrue(responseJson.containsKey("confidence"), "Response missing 'confidence'");
    }
}