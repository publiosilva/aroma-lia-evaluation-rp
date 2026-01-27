# Original URL: https://github.com/ibmdbanalytics/ibmdbpy/blob/c7f1cd3892b609644e3d68fcbdec151ac4634612/ibmdbpy/tests/test_frame.py#L402-L414

class Test_DataExploration(object):

    @pytest.mark.skip(reason="tail on sorted dataframe fails in general, needs fixing first")
    def test_smell_132(self, idadf, df):
        sortIdx = len(df.columns) - 1
        sortkey = idadf.columns[sortIdx]
        newidadf = idadf.sort(sortkey)
        ida_tail = newidadf.tail()

        df_tail = df.sort_values(sortkey).tail()

        assert(" ORDER BY " in newidadf.internal_state.get_state())
        assert isinstance(ida_tail, pandas.core.frame.DataFrame)
        assert len(ida_tail) == 5
        assert(ida_tail[sortkey].tolist() == df_tail[sortkey].tolist())