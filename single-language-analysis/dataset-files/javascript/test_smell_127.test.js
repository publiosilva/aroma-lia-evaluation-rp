const { expect } = require('jest');

describe('KMeans', () => {
    const dataContainers = []; // Define your data containers here
    const dataContainersIds = []; // Define your data containers ids here

    it('should relocate clusters for all dataContainers and algorithms', () => {
        for (let index = 0; index < dataContainers.length; index++) {
            const arrayConstr = dataContainers[index];
            for (let algoIndex = 0; algoIndex < ['lloyd', 'elkan'].length; algoIndex++) {
                const algo = ['lloyd', 'elkan'][algoIndex];
                const X = arrayConstr([[0, 0], [0.5, 0], [0.5, 1], [1, 1]]);
                const initCenters = [[0.5, 0.5], [3, 3]];

                const kmeans = new KMeans({ nClusters: 2, nInit: 1, init: initCenters, algorithm: algo });
                kmeans.fit(X);

                const expectedNIter = 3;
                const expectedInertia = 0.25;
                expect(kmeans.inertia_).toBeCloseTo(expectedInertia);
                expect(kmeans.n_iter_).toBe(expectedNIter);

                try {
                    const expectedLabels = [0, 0, 1, 1];
                    const expectedCenters = [[0.25, 0], [0.75, 1]];
                    expect(kmeans.labels_).toEqual(expectedLabels);
                    expect(kmeans.cluster_centers_).toBeCloseTo(expectedCenters);
                } catch (error) {
                    const expectedLabels = [1, 1, 0, 0];
                    const expectedCenters = [[0.75, 1.0], [0.25, 0.0]];
                    expect(kmeans.labels_).toEqual(expectedLabels);
                    expect(kmeans.cluster_centers_).toBeCloseTo(expectedCenters);
                }
            }
        }
    });
});