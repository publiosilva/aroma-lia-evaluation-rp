import org.junit.Test;
import static org.junit.Assert.*;
import java.util.regex.Pattern;

public class TestSmell099 {

    @Test
    public void testKMeansVerbose() {
        String[] algorithms = {"lloyd", "elkan"};
        double[] tols = {1e-2, 0};

        for (String algorithm : algorithms) {
            for (double tol : tols) {
                double[][] X = new double[5000][10];
                // Populate X with random values (omitted for brevity)

                KMeans kMeans = new KMeans(
                    algorithm,
                    nClusters,
                    42,
                    "random",
                    1,
                    tol,
                    1
                );
                kMeans.fit(X);

                String captured = ""; // Capture output (omitted for brevity)

                assertTrue(Pattern.compile("Initialization complete").matcher(captured).find());
                assertTrue(Pattern.compile("Iteration [0-9]+, inertia").matcher(captured).find());

                if (tol == 0) {
                    assertTrue(Pattern.compile("strict convergence").matcher(captured).find());
                } else {
                    assertTrue(Pattern.compile("center shift .* within tolerance").matcher(captured).find());
                }
            }
        }
    }
}