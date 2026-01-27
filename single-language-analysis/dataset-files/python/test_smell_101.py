# Original URL: https://github.com/Pham-Ngoc-Huy/Two_Sum/blob/268c021fc652ae99c817dd79dd1085d1de1593ee/automate/Lib/site-packages/pandas/tests/arrays/test_datetimes.py#L365-L389

class TestDatetimeArray:

    @pytest.mark.parametrize("dtype", ["datetime64[ns]", "datetime64[ns, UTC]"])
    @pytest.mark.parametrize(
        "other", ["datetime64[ns]", "datetime64[ns, UTC]", "datetime64[ns, CET]"]
    )
    def test_smell_101(self, dtype, other):
        # https://github.com/pandas-dev/pandas/pull/32490
        ser = pd.Series([1, 2], dtype=dtype)
        orig = ser.copy()

        err = False
        if (dtype == "datetime64[ns]") ^ (other == "datetime64[ns]"):
            # deprecated in favor of tz_localize
            err = True

        if err:
            if dtype == "datetime64[ns]":
                msg = "Use obj.tz_localize instead or series.dt.tz_localize instead"
            else:
                msg = "from timezone-aware dtype to timezone-naive dtype"
            with pytest.raises(TypeError, match=msg):
                ser.astype(other)
        else:
            t = ser.astype(other)
            t[:] = pd.NaT
            tm.assert_series_equal(ser, orig)