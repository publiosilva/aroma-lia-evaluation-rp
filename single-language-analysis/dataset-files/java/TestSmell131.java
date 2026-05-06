import org.junit.Test;
import org.junit.Ignore;
import static org.junit.Assert.*;

public class TestSmell131 {

    @Ignore("Disabled on Windows")
    @Test
    public void testNoTerm() {
        // monkeypatch.setenv("TERM", "");
        setEnv("TERM", "");

        String s = captureOutput("gpustat", "--color", "--no-header").trim();
        System.out.println(s);
        assertEquals(MOCK_EXPECTED_OUTPUT_DEFAULT, removeAnsiCodes(s));
        
        assertTrue("should contain cyan color code", s.contains("\u001B[36m"));
        assertFalse("Extra \\x0f found (see issue #32)", s.contains("\u000F"));
    }
}