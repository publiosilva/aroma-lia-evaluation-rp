using Xunit;

public class TestSmell142
{
    [Fact]
    public void TestKMeansFunction()
    {
        // test calling the k_means function directly
        var (ClusterCenters, Labels, Inertia) = KMeans(X, n_clusters, null, global_random_seed);

        Assert.Equal((n_clusters, n_features), ClusterCenters.Shape);
        Assert.Equal(n_clusters, np.Unique(Labels).Shape[0]);

        // check that the labels assignment are perfect (up to a permutation)
        Assert.Equal(1.0, VMeasureScore(TrueLabels, Labels));
        Assert.True(Inertia > 0.0);
    }
}