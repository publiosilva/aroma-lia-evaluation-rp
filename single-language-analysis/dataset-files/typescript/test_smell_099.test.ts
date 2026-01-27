import { expect } from '@jest/globals';

describe('KMeans', () => {
    const nClusters = 3; // Assuming a value for n_clusters

    const algorithms = ["lloyd", "elkan"];
    const tolerances = [1e-2, 0];

    it("test_smell_099", () => {
        algorithms.forEach(algorithm => {
            tolerances.forEach(tol => {
                // Check verbose mode of KMeans for better coverage.
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

                kMeans.fit(X);

                const captured = kMeans.getOutput(); // Assuming a method to capture output

                expect(/Initialization complete/.test(captured)).toBe(true);
                expect(/Iteration [0-9]+, inertia/.test(captured)).toBe(true);

                if (tol === 0) {
                    expect(/strict convergence/.test(captured)).toBe(true);
                } else {
                    expect(/center shift .* within tolerance/.test(captured)).toBe(true);
                }
            });
        });
    });
});