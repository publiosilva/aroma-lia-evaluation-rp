const { expect } = require('jest');

describe('KMeans', () => {
    it("test_smell_142", () => {
        const clusterCenters = [];
        const labels = [];
        const inertia = kMeans(X, { nClusters: nClusters, sampleWeight: null, randomState: globalRandomSeed });

        expect(clusterCenters.shape).toEqual([nClusters, nFeatures]);
        expect(np.unique(labels).shape[0]).toBe(nClusters);

        expect(vMeasureScore(trueLabels, labels)).toBeCloseTo(1.0);
        expect(inertia).toBeGreaterThan(0.0);
    });
});