const { expect } = require('jest');

describe('RelocateEmptyClusters', () => {
    const dataContainers = []; // Define your data containers here
    const dataContainersIds = []; // Define your data containers ids here

    it("should relocate empty clusters for all data containers", () => {
        for (let index = 0; index < dataContainers.length; index++) {
            const arrayConstr = dataContainers[index];
            const X = np.array([-10.0, -9.5, -9, -8.5, -8, -1, 1, 9, 9.5, 10]).reshape(-1, 1);
            const arrayX = arrayConstr(X);
            const sampleWeight = np.ones(10);

            const centersOld = np.array([-10.0, -10, -10]).reshape(-1, 1);
            const centersNew = np.array([-16.5, -10, -10]).reshape(-1, 1);
            const weightInClusters = np.array([10.0, 0, 0]);
            const labels = np.zeros(10, dtype=np.int32);

            if (arrayConstr === np.array) {
                _relocate_empty_clusters_dense(
                    arrayX, sampleWeight, centersOld, centersNew, weightInClusters, labels
                );
            } else {
                _relocate_empty_clusters_sparse(
                    arrayX.data,
                    arrayX.indices,
                    arrayX.indptr,
                    sampleWeight,
                    centersOld,
                    centersNew,
                    weightInClusters,
                    labels,
                );
            }

            expect(weightInClusters).toEqual([8, 1, 1]);
            expect(centersNew).toBeCloseTo([[-36], [10], [9.5]]);
        }
    });
});