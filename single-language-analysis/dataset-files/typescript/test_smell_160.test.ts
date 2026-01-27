import { expect } from '@jest/globals';

describe('MinibatchKMeans', () => {
    it("test_smell_160", () => {
        // Test for the case that the number of clusters to reassign is bigger
        // than the batch_size. Run the test with 100 clusters and a batch_size of
        // 10 because it turned out that these values ensure that the number of
        // clusters to reassign is always bigger than the batch_size.
        const minibatchKMeans = new MiniBatchKMeans({
            nClusters: 100,
            batchSize: 10,
            initSize: nSamples,
            randomState: 42,
            verbose: true,
        });
        minibatchKMeans.fit(X);
    });
});