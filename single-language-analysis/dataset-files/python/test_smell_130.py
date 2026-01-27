# Original URL: https://github.com/ManuMartinezM/Proyecto_Final_Grupo_5/blob/ee7723e6ab69a464ec2853c0e061b98f86ada8be/PF_venv/Lib/site-packages/pandas/tests/computation/test_eval.py#L1539-L1551

class TestMath:

    @pytest.mark.skipif(
        not NUMEXPR_INSTALLED, reason="Unary ops only implemented for numexpr"
    )
    @pytest.mark.parametrize("fn", _unary_math_ops)
    def test_smell_130(self, fn):
        df = DataFrame({"a": np.random.randn(10)})
        a = df.a

        expr = f"{fn}(a)"
        got = self.eval(expr)
        with np.errstate(all="ignore"):
            expect = getattr(np, fn)(a)
        tm.assert_series_equal(got, expect, check_names=False)