using Xunit;

public class TestSmell099
{
    [Theory]
    [InlineData("lloyd", 1e-2)]
    [InlineData("lloyd", 0)]
    [InlineData("elkan", 1e-2)]
    [InlineData("elkan", 0)]
    public void TestKMeansVerbose(string algorithm, double tol)
    {
        var X = new double[5000, 10];
        var random = new Random(0);
        for (int i = 0; i < 5000; i++)
        {
            for (int j = 0; j < 10; j++)
            {
                X[i, j] = random.NextDouble();
            }
        }

        var kMeans = new KMeans(
            algorithm: algorithm,
            n_clusters: n_clusters,
            random_state: 42,
            init: "random",
            n_init: 1,
            tol: tol,
            verbose: 1
        );
        kMeans.Fit(X);

        var captured = Console.Out.ToString();

        Assert.True(Regex.IsMatch(captured, "Initialization complete"));
        Assert.True(Regex.IsMatch(captured, "Iteration [0-9]+, inertia"));

        if (tol == 0)
        {
            Assert.True(Regex.IsMatch(captured, "strict convergence"));
        }
        else
        {
            Assert.True(Regex.IsMatch(captured, "center shift .* within tolerance"));
        }
    }
}