import org.junit.Test;
import static org.junit.Assert.*;

public class TestSmell144 {

    private String removeAnsiCodesAndHeaderLine(String s) {
        String unescaped = removeAnsiCodes(s);
        unescaped = String.join(System.lineSeparator(), unescaped.split(System.lineSeparator(), 2)[1]);
        return unescaped;
    }

    @Test
    public void testArgsCommandline() {
        String captureOutput = this.captureOutput;

        String s = captureOutput("gpustat");
        assertEquals(MOCK_EXPECTED_OUTPUT_DEFAULT, removeAnsiCodesAndHeaderLine(s));

        s = captureOutput("gpustat", "--version");
        assertTrue(s.startsWith("gpustat "));
        System.out.println(s);

        s = captureOutput("gpustat", "--no-header");
        assertTrue(s.split(System.lineSeparator())[0].contains("[0]"));

        s = captureOutput("gpustat", "-a");
        assertEquals(MOCK_EXPECTED_OUTPUT_FULL, removeAnsiCodesAndHeaderLine(s));

        s = captureOutput("gpustat", "--color");
        assertFalse(s.contains("\u000F"));
        assertEquals(MOCK_EXPECTED_OUTPUT_DEFAULT, removeAnsiCodesAndHeaderLine(s));

        s = captureOutput("gpustat", "--no-color");
        String unescaped = removeAnsiCodes(s);
        assertEquals(s, unescaped);
        assertEquals(MOCK_EXPECTED_OUTPUT_DEFAULT, removeAnsiCodesAndHeaderLine(s));

        s = captureOutput("gpustat", "--no-processes");
        assertEquals(MOCK_EXPECTED_OUTPUT_NO_PROCESSES, removeAnsiCodesAndHeaderLine(s));

        s = captureOutput("gpustat", "--id", "1,2");
        assertEquals(String.join(System.lineSeparator(), MOCK_EXPECTED_OUTPUT_DEFAULT.split(System.lineSeparator(), 3)[1], MOCK_EXPECTED_OUTPUT_DEFAULT.split(System.lineSeparator(), 3)[2]), removeAnsiCodesAndHeaderLine(s));
    }
}