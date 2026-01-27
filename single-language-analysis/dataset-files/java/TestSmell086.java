import org.junit.Test;
import static org.junit.Assert.*;

public class TestSmell086 {

    @Test
    public void testAttributesAndItems() {
        GPUStat g = gpustat.newQuery()[1]; // includes N/A
        System.out.println("(keys) : " + g.keys());
        System.out.println(g);

        assertEquals(g.entry["name"], g["name"]);
        assertEquals(g.uuid, g["uuid"]);

        try {
            g["unknown_key"];
        } catch (KeyError e) {
            // Expected exception
        }

        System.out.println("uuid : " + g.uuid);
        System.out.println("name : " + g.name);
        System.out.println("memory : used " + g.memoryUsed + " total " + g.memoryTotal + " avail " + g.memoryAvailable);
        System.out.println("temperature : " + g.temperature);
        System.out.println("utilization : " + g.utilization);
        System.out.println("utilization_enc : " + g.utilizationEnc);
        System.out.println("utilization_dec : " + g.utilizationDec);
    }
}