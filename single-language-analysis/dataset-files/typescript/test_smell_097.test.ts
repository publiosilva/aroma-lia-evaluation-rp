import { expect } from '@jest/globals';

describe('RelocateEmptyClusters', () => {
    const dataContainers = []; // Define your data containers here
    const dataContainersIds = []; // Define your data container ids here

    const testCases = dataContainers.map((arrayConstr, index) => ({
        arrayConstr,
        id: dataContainersIds[index],
    }));

    it("test_smell_097", () => {
        testCases.forEach(({ arrayConstr, id }) => {
            // Test implementation needed

            const X = np.array([-10.0, -9.5, -9, -8.5, -8, -1, 1, 9, 9.5, 10]).reshape(-1, 1);
            const sampleWeight = np.ones(10);

            const centersOld = np.array([-10.0, -10, -10]).reshape(-1, 1);
            const centersNew = np.array([-16.5, -10, -10]).reshape(-1, 1);
            const weightInClusters = np.array([10.0, 0, 0]);
            const labels = np.zeros(10, dtype=np.int32);

            if (arrayConstr === np.array) {
                _relocateEmptyClustersDense(
                    X, sampleWeight, centersOld, centersNew, weightInClusters, labels
                );
            } else {
                _relocateEmptyClustersSparse(
                    X.data,
                    X.indices,
                    X.indptr,
                    sampleWeight,
                    centersOld,
                    centersNew,
                    weightInClusters,
                    labels,
                );
            }

            expect(weightInClusters).toEqual([8, 1, 1]);
            expect(centersNew).toBeCloseTo([[-36], [10], [9.5]]);
        });
    });
});