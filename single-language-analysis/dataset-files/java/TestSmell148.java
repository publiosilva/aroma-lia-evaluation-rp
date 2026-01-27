import org.junit.Test;
import static org.junit.Assert.*;

public class TestSmell148 {

    @Test
    public void testNewQueryMockedNonexistentPid() {
        StringBuilder fp = new StringBuilder();

        GPUSStat gpustats = GPUSStat.newQuery();
        gpustats.printFormatted(fp);

        String ret = fp.toString();
        System.out.println(ret);

        String line = removeAnsiCodes(ret).split("\n")[3];
        assertTrue(line.contains("[2] GeForce RTX 2"), line);
        assertFalse(line.contains("99999"));
        assertFalse(line.contains("(Not Supported)"));
    }
}