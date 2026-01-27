import org.junit.Test;
import static org.junit.Assert.*;

public class TestSmell142 {

    @Test
    public void testKMeansFunction() {
        // test calling the k_means function directly
        double[][] clusterCenters = new double[nClusters][nFeatures];
        int[] labels = new int[X.length];
        double inertia = kMeans(X, nClusters, null, globalRandomSeed, clusterCenters, labels);

        assertEquals(new int[]{nClusters, nFeatures}, clusterCenters.shape());
        assertEquals(nClusters, unique(labels).length);

        // check that the labels assignment are perfect (up to a permutation)
        assertEquals(1.0, vMeasureScore(trueLabels, labels), 0.0);
        assertTrue(inertia > 0.0);
    }
}