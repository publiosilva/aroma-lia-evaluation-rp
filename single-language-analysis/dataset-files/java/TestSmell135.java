import org.junit.Test;
import static org.junit.Assert.*;

public class TestSmell135 {

    @Test
    @DisabledIf("isNotTensorFlow")
    public void testSparsePlaceholderFit() {
        Object[] testInputs = new Object[2];
        for (int i = 0; i < 2; i++) {
            testInputs[i] = sparse.random(6, 3, 0.25).tocsr();
        }
        Object[] testOutputs = new Object[2];
        for (int i = 3; i < 5; i++) {
            testOutputs[i - 3] = sparse.random(6, i, 0.25).tocsr();
        }
        Input in1 = Input.shape(3);
        Input in2 = Input.shape(3).sparse(true);
        Object out1 = Dropout.create(0.5, "dropout").apply(in1);
        Object out2 = Dense.create(4, "dense_1").apply(in2);
        Model model = Model.create(new Input[]{in1, in2}, new Object[]{out1, out2});
        model.predict(testInputs, 2);
        model.compile("rmsprop", "mse");
        model.fit(testInputs, testOutputs, 1, 2, 0.5);
        model.evaluate(testInputs, testOutputs, 2);
    }
}