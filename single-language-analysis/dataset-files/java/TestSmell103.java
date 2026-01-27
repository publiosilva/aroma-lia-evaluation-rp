import org.junit.Test;
import static org.junit.Assert.*;

public class TestSmell103 {

    @Test
    public void testArgsCommandlineShowOptions() {
        String captureOutput = this.captureOutput();
        System.out.println("");

        String[] testOpts = new String[]{
            "-a", "-c", "-u", "-p", "-e", "-P", "-f",
            "-e", "", "-P", "",
            "-e", "enc,dec", "-Plimit,draw",
            "-cup", "-cpu", "-cufP"
        };

        for (String opt : testOpts) {
            String[] options;
            if (opt instanceof String) {
                options = new String[]{opt};
            } else {
                options = (String[]) opt;
            }

            System.out.print("\u001B[30m\u001B[43m" + "$ gpustat " + String.join(" ", options) + "\u001B(B\u001B[m");
            String s = captureOutput("gpustat", options);

            // TODO: Validate output without hardcoding expected outputs
            System.out.println(s);
        }

        // Finally, unknown args
        try {
            captureOutput("gpustat", "--unrecognized-args-in-test");
            fail("Expected AssertionError");
        } catch (AssertionError e) {
            // Expected exception
        }
    }
}