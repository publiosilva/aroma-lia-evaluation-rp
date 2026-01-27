using Xunit;

public class TestSmell127
{
    [Theory]
    [InlineData(/* data_containers */)]
    [InlineData(/* data_containers_ids */)]
    public void TestKMeansRelocatedClusters(/* parameters */)
    {
        // check that empty clusters are relocated as expected
        var X = array_constr(new double[,] { { 0, 0 }, { 0.5, 0 }, { 0.5, 1 }, { 1, 1 } });

        // second center too far from others points will be empty at first iter
        var init_centers = new double[,] { { 0.5, 0.5 }, { 3, 3 } };

        var kmeans = new KMeans(n_clusters: 2, n_init: 1, init: init_centers, algorithm: algo);
        kmeans.Fit(X);

        var expected_n_iter = 3;
        var expected_inertia = 0.25;
        Assert.Equal(expected_inertia, kmeans.Inertia_);
        Assert.Equal(expected_n_iter, kmeans.NIter_);

        // There are two acceptable ways of relocating clusters in this example, the output
        // depends on how the argpartition strategy breaks ties. We accept both outputs.
        try
        {
            var expected_labels = new int[] { 0, 0, 1, 1 };
            var expected_centers = new double[,] { { 0.25, 0 }, { 0.75, 1 } };
            Assert.Equal(expected_labels, kmeans.Labels_);
            Assert.Equal(expected_centers, kmeans.ClusterCenters_);
        }
        catch (AssertionException)
        {
            var expected_labels = new int[] { 1, 1, 0, 0 };
            var expected_centers = new double[,] { { 0.75, 1.0 }, { 0.25, 0.0 } };
            Assert.Equal(expected_labels, kmeans.Labels_);
            Assert.Equal(expected_centers, kmeans.ClusterCenters_);
        }
    }
}