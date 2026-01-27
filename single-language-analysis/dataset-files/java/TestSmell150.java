import org.junit.Test;
import static org.junit.Assert.*;

public class TestSmell150 {

    @Test
    public void testNewQueryMockedFailingOneGpu() {
        StringWriter fp = new StringWriter();
        GPUSStats gpustats = GPUSStat.newQuery();
        gpustats.printFormatted(fp, false);
        String ret = fp.toString();
        System.out.println(ret);

        String[] lines = removeAnsiCodes(ret).split("\n");
        String message = scenarioFailingOneGpu.get("expected_message");

        // gpu 2: failing due to unknown error
        String line = lines[2];
        assertTrue(line.contains("[2] ((" + message + "))"), line);
        assertFalse(line.contains("99999"));
        assertTrue(line.contains("??°C,  ?? %"), line);
        assertTrue(line.contains("?? /    ?? MB"), line);

        // other gpus should be displayed normally
        assertTrue(lines[0].contains("[0] GeForce GTX TITAN 0"));
        assertTrue(lines[1].contains("[1] GeForce GTX TITAN 1"));
    }
}