import org.junit.Test;
import static org.junit.Assert.*;

public class TestSmell093 {

    @Test
    public void testMinibatchUpdateConsistency() {
        // Check that dense and sparse minibatch update give the same results
        Random rng = new Random(globalRandomSeed);

        double[][] centersOld = centers.clone();
        for (int i = 0; i < centersOld.length; i++) {
            centersOld[i] = centersOld[i] + rng.nextGaussian();
        }
        double[][] centersOldCsr = centersOld.clone();

        double[][] centersNew = new double[centersOld.length][];
        double[][] centersNewCsr = new double[centersOldCsr.length][];

        double[] weightSums = new double[centersOld.length];
        double[] weightSumsCsr = new double[centersOldCsr.length];

        double[] sampleWeight = new double[X.length];
        Arrays.fill(sampleWeight, 1.0);

        // extract a small minibatch
        double[][] XMb = Arrays.copyOfRange(X, 0, 10);
        double[][] XMbCsr = Arrays.copyOfRange(XCsr, 0, 10);
        double[] sampleWeightMb = Arrays.copyOfRange(sampleWeight, 0, 10);

        // step 1: compute the dense minibatch update
        double oldInertia = miniBatchStep(
            XMb,
            sampleWeightMb,
            centersOld,
            centersNew,
            weightSums,
            new Random(globalRandomSeed),
            false
        );
        assertTrue(oldInertia > 0.0);

        // compute the new inertia on the same batch to check that it decreased
        double[] labels = new double[0];
        double newInertia = labelsInertia(XMb, sampleWeightMb, centersNew);
        assertTrue(newInertia > 0.0);
        assertTrue(newInertia < oldInertia);

        // step 2: compute the sparse minibatch update
        double oldInertiaCsr = miniBatchStep(
            XMbCsr,
            sampleWeightMb,
            centersOldCsr,
            centersNewCsr,
            weightSumsCsr,
            new Random(globalRandomSeed),
            false
        );
        assertTrue(oldInertiaCsr > 0.0);

        // compute the new inertia on the same batch to check that it decreased
        double[] labelsCsr = new double[0];
        double newInertiaCsr = labelsInertia(XMbCsr, sampleWeightMb, centersNewCsr);
        assertTrue(newInertiaCsr > 0.0);
        assertTrue(newInertiaCsr < oldInertiaCsr);

        // step 3: check that sparse and dense updates lead to the same results
        assertArrayEquals(labels, labelsCsr);
        assertArrayEquals(centersNew, centersNewCsr);
        assertEquals(oldInertia, oldInertiaCsr, 0.0);
        assertEquals(newInertia, newInertiaCsr, 0.0);
    }
}