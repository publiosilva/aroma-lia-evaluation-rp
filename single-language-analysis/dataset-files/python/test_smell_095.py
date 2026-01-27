# Original URL: https://github.com/ibmdbanalytics/ibmdbpy/blob/c7f1cd3892b609644e3d68fcbdec151ac4634612/ibmdbpy/tests/test_frame.py#L315-L331

class Test_DataExploration(object):

    def test_smell_095(self, idadf, df):
        if len(idadf.columns) >= 4:
            columns = idadf.columns[1:4].tolist()
            newidadf = idadf[columns]

            sortkey = newidadf.columns[0]
            if newidadf._get_numerical_columns():
                sortkey = newidadf._get_numerical_columns()[0]

            ida_head = newidadf.head()

            df_sorted = df.sort_values(sortkey)
            df_head = df_sorted[columns].head()

            assert isinstance(ida_head, pandas.core.frame.DataFrame)
            assert len(ida_head) == 5
            assert(ida_head[sortkey].tolist() == df_head[sortkey].tolist())