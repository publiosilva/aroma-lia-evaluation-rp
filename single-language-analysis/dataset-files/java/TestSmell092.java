import org.junit.Test;
import static org.junit.Assert.*;

public class TestSmell092 {

    @Test
    public void testMinibatchKmeansInitSize() {
        // default init size should be 3 * batch_size
        MiniBatchKMeans km = new MiniBatchKMeans(10, 5, 1).fit(X);
        assertEquals(15, km.getInitSize());

        // if 3 * batch size < n_clusters, it should then be 3 * n_clusters
        km = new MiniBatchKMeans(10, 1, 1).fit(X);
        assertEquals(30, km.getInitSize());

        // it should not be larger than n_samples
        km = new MiniBatchKMeans(10, 5, 1, nSamples + 1).fit(X);
        assertEquals(nSamples, km.getInitSize());
    }
}