import { expect } from '@jest/globals';

describe('MinibatchUpdateConsistency', () => {
  it("test_smell_093", () => {
    const rng = new Random(globalRandomSeed);

    const centersOld = centers + rng.normal(centers.shape);
    const centersOldCsr = centersOld.copy();

    const centersNew = new Array(centersOld.length).fill(0);
    const centersNewCsr = new Array(centersOldCsr.length).fill(0);

    const weightSums = new Array(centersOld.length).fill(0).map(() => new X.dtype());
    const weightSumsCsr = new Array(centersOld.length).fill(0).map(() => new X.dtype());

    const sampleWeight = new Array(X.shape[0]).fill(1).map(() => new X.dtype());

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
      false,
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
      false,
    );
    expect(oldInertiaCsr).toBeGreaterThan(0.0);

    const [labelsCsr, newInertiaCsr] = labelsInertia(XMbCsr, sampleWeightMb, centersNewCsr);
    expect(newInertiaCsr).toBeGreaterThan(0.0);
    expect(newInertiaCsr).toBeLessThan(oldInertiaCsr);

    expect(labels).toEqual(labelsCsr);
    expect(centersNew).toBeCloseTo(centersNewCsr);
    expect(oldInertia).toBeCloseTo(oldInertiaCsr);
    expect(newInertia).toBeCloseTo(newInertiaCsr);
  });
});