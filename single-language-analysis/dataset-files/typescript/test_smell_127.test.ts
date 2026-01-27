import { expect } from '@jest/globals';

describe('KMeans', () => {
    const dataContainers = []; // Define your data containers here
    const dataContainersIds = []; // Define your data containers ids here

    const testKMeansRelocatedClusters = (arrayConstr: any, algo: string) => {
        // check that empty clusters are relocated as expected
        const X = arrayConstr([[0, 0], [0.5, 0], [0.5, 1], [1, 1]]);

        // second center too far from others points will be empty at first iter
        const initCenters = [[0.5, 0.5], [3, 3]];

        const kmeans = new KMeans({ nClusters: 2, nInit: 1, init: initCenters, algorithm: algo });
        kmeans.fit(X);

        const expectedNIter = 3;
        const expectedInertia = 0.25;
        expect(kmeans.inertia_).toBeCloseTo(expectedInertia);
        expect(kmeans.n_iter_).toBe(expectedNIter);

        // There are two acceptable ways of relocating clusters in this example, the output
        // depends on how the argpartition strategy breaks ties. We accept both outputs.
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
    };

    dataContainers.forEach((arrayConstr, index) => {
        ['lloyd', 'elkan'].forEach(algo => {
            it(`should relocate clusters for ${dataContainersIds[index]} using ${algo}`, () => {
                testKMeansRelocatedClusters(arrayConstr, algo);
            });
        });
    });
});