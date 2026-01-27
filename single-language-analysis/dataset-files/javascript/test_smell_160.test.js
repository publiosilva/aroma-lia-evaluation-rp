const { expect } = require('jest');

describe('MiniBatchKMeans', () => {
    it("test_smell_160", () => {
        MiniBatchKMeans({
            nClusters: 100,
            batchSize: 10,
            initSize: nSamples,
            randomState: 42,
            verbose: true,
        }).fit(X);
    });
});