import org.junit.Test;
import static org.junit.Assert.*;

public class TestSmell127 {

    @Test
    public void testKmeansRelocatedClusters() {
        // check that empty clusters are relocated as expected
        ArrayConstructor arrayConstr = new ArrayConstructor();
        double[][] X = arrayConstr.construct(new double[][]{{0, 0}, {0.5, 0}, {0.5, 1}, {1, 1}});

        // second center too far from others points will be empty at first iter
        double[][] initCenters = new double[][]{{0.5, 0.5}, {3, 3}};

        KMeans kmeans = new KMeans(2, 1, initCenters, "lloyd");
        kmeans.fit(X);

        int expectedNIter = 3;
        double expectedInertia = 0.25;
        assertEquals(expectedInertia, kmeans.getInertia(), 1e-9);
        assertEquals(expectedNIter, kmeans.getNIter());

        // There are two acceptable ways of relocating clusters in this example, the output
        // depends on how the argpartition strategy breaks ties. We accept both outputs.
        try {
            int[] expectedLabels = new int[]{0, 0, 1, 1};
            double[][] expectedCenters = new double[][]{{0.25, 0}, {0.75, 1}};
            assertArrayEquals(expectedLabels, kmeans.getLabels());
            assertArrayEquals(expectedCenters, kmeans.getClusterCenters(), 1e-9);
        } catch (AssertionError e) {
            int[] expectedLabels = new int[]{1, 1, 0, 0};
            double[][] expectedCenters = new double[][]{{0.75, 1.0}, {0.25, 0.0}};
            assertArrayEquals(expectedLabels, kmeans.getLabels());
            assertArrayEquals(expectedCenters, kmeans.getClusterCenters(), 1e-9);
        }
    }
}