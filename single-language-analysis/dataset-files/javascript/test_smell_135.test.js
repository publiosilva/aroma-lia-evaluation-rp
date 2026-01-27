const { expect } = require('jest');

describe('TrackerCallback', () => {
    test.skip('sparsePlaceholderFit', () => {
        const testInputs = [sparse.random(6, 3, { density: 0.25 }).tocsr(), sparse.random(6, 3, { density: 0.25 }).tocsr()];
        const testOutputs = [sparse.random(6, 3, { density: 0.25 }).tocsr(), sparse.random(6, 4, { density: 0.25 }).tocsr()];
        const in1 = Input({ shape: [3] });
        const in2 = Input({ shape: [3], sparse: true });
        const out1 = Dropout(0.5, { name: 'dropout' })(in1);
        const out2 = Dense(4, { name: 'dense_1' })(in2);
        const model = Model([in1, in2], [out1, out2]);
        model.predict(testInputs, { batchSize: 2 });
        model.compile('rmsprop', 'mse');
        model.fit(testInputs, testOutputs, {
            epochs: 1,
            batchSize: 2,
            validationSplit: 0.5
        });
        model.evaluate(testInputs, testOutputs, { batchSize: 2 });
    });
});