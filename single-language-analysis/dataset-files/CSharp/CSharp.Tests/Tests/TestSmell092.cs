using Xunit;

public class TestSmell092
{
    [Fact]
    public void TestMinibatchKmeansInitSize()
    {
        // Check the internal _init_size attribute of MiniBatchKMeans

        // default init size should be 3 * batch_size
        var km = new MiniBatchKMeans(n_clusters: 10, batch_size: 5, n_init: 1).Fit(X);
        Assert.Equal(15, km._init_size);

        // if 3 * batch size < n_clusters, it should then be 3 * n_clusters
        km = new MiniBatchKMeans(n_clusters: 10, batch_size: 1, n_init: 1).Fit(X);
        Assert.Equal(30, km._init_size);

        // it should not be larger than n_samples
        km = new MiniBatchKMeans(
            n_clusters: 10, batch_size: 5, n_init: 1, init_size: n_samples + 1
        ).Fit(X);
        Assert.Equal(n_samples, km._init_size);
    }
}