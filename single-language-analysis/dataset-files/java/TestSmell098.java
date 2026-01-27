import org.junit.Test;
import static org.junit.Assert.*;

public class TestSmell098 {

    @Test
    public void testDates(String args, boolean fromCLI) {
        args = comm.getAnonArgs(args);
        if (0 == args.length()) {
            throw new cex.ArgError("At least one argument is required.  Usage:\n"
                + "splunk test dates \"<string>\" OR\n"
                + "splunk test dates file <filename>");
        }

        String argString = String.join(" ", Arrays.stream(args.split(" ")).map(x -> "\"" + x + "\"").toArray(String[]::new));
        Runtime.getRuntime().exec("parsetest " + argString);
    }
}