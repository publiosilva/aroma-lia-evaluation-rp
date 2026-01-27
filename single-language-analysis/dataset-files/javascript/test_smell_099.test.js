const { expect } = require('jest');

describe('KMeans', () => {
    const nClusters = 3; // Assuming a value for n_clusters

    it("test_smell_099", () => {
        const algorithms = ["lloyd", "elkan"];
        const tols = [1e-2, 0];
        for (const algorithm of algorithms) {
            for (const tol of tols) {
                const X = Array.from({ length: 5000 }, () => Array.from({ length: 10 }, () => Math.random()));

                const kMeans = new KMeans({
                    algorithm: algorithm,
                    nClusters: nClusters,
                    randomState: 42,
                    init: "random",
                    nInit: 1,
                    tol: tol,
                    verbose: 1,
                });

                const captured = kMeans.fit(X);

                expect(/Initialization complete/.test(captured.out)).toBe(true);
                expect(/Iteration [0-9]+, inertia/.test(captured.out)).toBe(true);

                if (tol === 0) {
                    expect(/strict convergence/.test(captured.out)).toBe(true);
                } else {
                    expect(/center shift .* within tolerance/.test(captured.out)).toBe(true);
                }
            }
        }
    });
});