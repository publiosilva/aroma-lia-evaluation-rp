import org.junit.Test;
import static org.junit.Assert.*;

public class TestSmell160 {

    @Test
    public void testMinibatchWithManyReassignments() {
        MiniBatchKMeans miniBatchKMeans = new MiniBatchKMeans(
            100,
            10,
            nSamples,
            42,
            true
        );
        miniBatchKMeans.fit(X);
    }
}