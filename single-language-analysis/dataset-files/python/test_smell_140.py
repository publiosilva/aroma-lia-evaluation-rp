# Original URL: https://github.com/pavankethavath/Car_dekho_car_price_prediction/blob/11acbb69e613bc46bd9af2863d52ccfbe5669ffc/venv/Lib/site-packages/~umpy/f2py/tests/test_callback.py#L88-L99

class TestA:
    @pytest.mark.skipif(sys.platform == 'win32',
                        reason='Fails with MinGW64 Gfortran (Issue #9673)')
    def test_smell_140(self):
        def callback(code):
            if code == "r":
                return 0
            else:
                return 1

        f = getattr(self.module, "string_callback")
        r = f(callback)
        assert r == 0