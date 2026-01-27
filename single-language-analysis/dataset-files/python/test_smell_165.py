# Original URL: https://github.com/jvaldiviezo9/path.py/blob/3684c4dc4896c174852b901b033e021a6267df2e/test_path.py#L107-L116

class TestBasics:

    def test_smell_165(self):
        """

        """
        try:
            Path(None)
        except TypeError:
            pass
        else:
            raise Exception("DID NOT RAISE")