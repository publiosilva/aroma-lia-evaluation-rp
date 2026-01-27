# Original URL: https://github.com/Pham-Ngoc-Huy/Two_Sum/blob/268c021fc652ae99c817dd79dd1085d1de1593ee/automate/Lib/site-packages/pandas/tests/arrays/test_datetimes.py#L328-L337

class TestDatetimeArray:

    def test_smell_109(self):
        dti = pd.date_range("2016-01-01", periods=3)

        res = dti.astype("M8[s]")
        assert res.dtype == "M8[s]"

        dta = dti._data
        res = dta.astype("M8[s]")
        assert res.dtype == "M8[s]"
        assert isinstance(res, pd.core.arrays.DatetimeArray)  # used to be ndarray