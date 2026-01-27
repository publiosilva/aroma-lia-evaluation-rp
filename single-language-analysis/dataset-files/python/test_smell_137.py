# Original URL: https://github.com/AshutoshPaudyal/movie-recommendation-system/blob/63746d2c8c24bf8a7a65f203ed8ca7b25217f92c/final/Lib/site-packages/pandas/tests/io/json/test_pandas.py#L427-L442

class TestPandasContainer:

    @pytest.mark.skipif(not IS64, reason="not compliant on 32-bit, xref #15865")
    @pytest.mark.parametrize(
        "value,precision,expected_val",
        [
            (0.95, 1, 1.0),
            (1.95, 1, 2.0),
            (-1.95, 1, -2.0),
            (0.995, 2, 1.0),
            (0.9995, 3, 1.0),
            (0.99999999999999944, 15, 1.0),
        ],
    )
    def test_smell_137(self, value, precision, expected_val):
        df = DataFrame([{"a_float": value}])
        encoded = df.to_json(double_precision=precision)
        assert encoded == f'{{"a_float":{{"0":{expected_val}}}}}'