import { expect } from '@jest/globals';

describe('MiniBatchKMeans', () => {
    it("test_smell_092", () => {
        // Test implementation needed

        // default init size should be 3 * batch_size
        const km1 = new MiniBatchKMeans({ nClusters: 10, batchSize: 5, nInit: 1 }).fit(X);
        expect(km1._initSize).toBe(15);

        // if 3 * batch size < n_clusters, it should then be 3 * n_clusters
        const km2 = new MiniBatchKMeans({ nClusters: 10, batchSize: 1, nInit: 1 }).fit(X);
        expect(km2._initSize).toBe(30);

        // it should not be larger than n_samples
        const km3 = new MiniBatchKMeans({
            nClusters: 10, batchSize: 5, nInit: 1, initSize: nSamples + 1
        }).fit(X);
        expect(km3._initSize).toBe(nSamples);
    });
});