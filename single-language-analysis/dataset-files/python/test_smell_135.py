# Original URL: https://github.com/shizukanaskytree/keras/blob/d7ea34fcc87159ec7d3b5a802b34629f756dd923/tests/keras/engine/test_training.py#L727-L741

@pytest.mark.skipif(K.backend() != 'tensorflow',
                    reason='sparse operations supported only by TensorFlow')
def test_smell_135():
    test_inputs = [sparse.random(6, 3, density=0.25).tocsr() for _ in range(2)]
    test_outputs = [sparse.random(6, i, density=0.25).tocsr() for i in range(3, 5)]
    in1 = Input(shape=(3,))
    in2 = Input(shape=(3,), sparse=True)
    out1 = Dropout(0.5, name='dropout')(in1)
    out2 = Dense(4, name='dense_1')(in2)
    model = Model([in1, in2], [out1, out2])
    model.predict(test_inputs, batch_size=2)
    model.compile('rmsprop', 'mse')
    model.fit(test_inputs, test_outputs,
              epochs=1, batch_size=2, validation_split=0.5)
    model.evaluate(test_inputs, test_outputs, batch_size=2)