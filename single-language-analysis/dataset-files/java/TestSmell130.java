import org.junit.Test;
import org.junit.Ignore;
import static org.junit.Assert.*;
import java.util.Random;

public class TestSmell130 {

    @Ignore("Unary ops only implemented for numexpr")
    @Test
    public void testUnaryFunctions() {
        String fn = getUnaryMathOp(); // Placeholder for parameterization
        DataFrame df = new DataFrame();
        df.put("a", generateRandomArray(10));
        double[] a = df.get("a");

        String expr = fn + "(a)";
        double[] got = eval(expr);
        double[] expect;
        try {
            expect = (double[]) getClass().getMethod(fn, double[].class).invoke(null, (Object) a);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        assertArrayEquals(expect, got, 0.0001);
    }
}