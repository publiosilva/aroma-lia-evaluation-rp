using Xunit;

public class TestSmell160
{
    [Fact]
    public void TestMinibatchWithManyReassignments()
    {
        MiniBatchKMeans(
            n_clusters: 100,
            batch_size: 10,
            init_size: n_samples,
            random_state: 42,
            verbose: true
        ).Fit(X);
    }
}