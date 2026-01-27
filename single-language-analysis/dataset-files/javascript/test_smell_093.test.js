const { expect } = require('jest');

describe('MinibatchUpdateConsistency', () => {
    test('minibatchUpdateConsistency', () => {
        for (const [X_csr, globalRandomSeed] of X_as_any_csr) {
            const rng = new Random(globalRandomSeed);

            const centersOld = centers.map((c, i) => c + rng.normal(0, 1, centers.shape[i]));
            const centersOldCsr = [...centersOld];

            const centersNew = new Array(centersOld.length).fill(0);
            const centersNewCsr = new Array(centersOldCsr.length).fill(0);

            const weightSums = new Array(centersOld.length).fill(0);
            const weightSumsCsr = new Array(centersOldCsr.length).fill(0);

            const sampleWeight = new Array(X.length).fill(1);

            const XMb = X.slice(0, 10);
            const XMbCsr = X_csr.slice(0, 10);
            const sampleWeightMb = sampleWeight.slice(0, 10);

            const oldInertia = miniBatchStep(
                XMb,
                sampleWeightMb,
                centersOld,
                centersNew,
                weightSums,
                new Random(globalRandomSeed),
                false
            );
            expect(oldInertia).toBeGreaterThan(0.0);

            const [labels, newInertia] = labelsInertia(XMb, sampleWeightMb, centersNew);
            expect(newInertia).toBeGreaterThan(0.0);
            expect(newInertia).toBeLessThan(oldInertia);

            const oldInertiaCsr = miniBatchStep(
                XMbCsr,
                sampleWeightMb,
                centersOldCsr,
                centersNewCsr,
                weightSumsCsr,
                new Random(globalRandomSeed),
                false
            );
            expect(oldInertiaCsr).toBeGreaterThan(0.0);

            const [labelsCsr, newInertiaCsr] = labelsInertia(XMbCsr, sampleWeightMb, centersNewCsr);
            expect(newInertiaCsr).toBeGreaterThan(0.0);
            expect(newInertiaCsr).toBeLessThan(oldInertiaCsr);

            expect(labels).toEqual(labelsCsr);
            expect(centersNew).toBeCloseTo(centersNewCsr);
            expect(oldInertia).toBeCloseTo(oldInertiaCsr);
            expect(newInertia).toBeCloseTo(newInertiaCsr);
        }
    });
});