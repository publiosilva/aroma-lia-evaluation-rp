import org.junit.Test;
import static org.junit.Assert.*;

public class TestSmell146 {

    @Test
    public void testNewQueryMockedBasic() {
        GPUSat gpustats = GPUSat.newQuery();
        StringWriter fp = new StringWriter();
        gpustats.printFormatted(
            fp, false, true,
            true, true,
            true, "enc,dec", true
        );

        String result = fp.toString();
        System.out.println(result);

        String unescaped = removeAnsiCodes(result);
        unescaped = String.join(System.lineSeparator(), unescaped.split(System.lineSeparator(), 2)[1]);

        assertEquals(MOCK_EXPECTED_OUTPUT_FULL_PROCESS, unescaped);

        assertEquals(gpustats.getDriverVersion(), nvidiaDriverVersion.getName());
        GPUSat.GPUStat g = gpustats.getGpus().get(0);
        assertEquals(8000, g.getMemoryUsed());
        assertEquals(125, g.getPowerDraw());
        assertEquals(76, g.getUtilization());
        assertTrue(g.getProcesses() != null && g.getProcesses().get(0).get("pid").equals(48448));
    }
}