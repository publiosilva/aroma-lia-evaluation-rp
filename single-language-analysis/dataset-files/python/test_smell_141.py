# Original URL: https://github.com/ibmdbanalytics/ibmdbpy/blob/c7f1cd3892b609644e3d68fcbdec151ac4634612/ibmdbpy/tests/test_frame.py#L296-L299

class Test_DataExploration(object):

    def test_smell_141(self, idadb, idadf, df):
        ida_head = idadf.head(10)
        assert isinstance(ida_head, pandas.core.frame.DataFrame)
        assert len(ida_head) == 10