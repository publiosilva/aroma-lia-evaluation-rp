# Original URL: https://github.com/jvaldiviezo9/path.py/blob/3684c4dc4896c174852b901b033e021a6267df2e/test_path.py#L450-L477

class TestScratchDir:

    def test_smell_091(self, tmpdir):
        d = Path(tmpdir)

        # Placeholder file so that when removedirs() is called,
        # it doesn't remove the temporary directory itself.
        tempf = d / 'temp.txt'
        tempf.touch()
        try:
            foo = d / 'foo'
            boz = foo / 'bar' / 'baz' / 'boz'
            boz.makedirs()
            try:
                assert boz.isdir()
            finally:
                boz.removedirs()
            assert not foo.exists()
            assert d.exists()

            foo.mkdir(0o750)
            boz.makedirs(0o700)
            try:
                assert boz.isdir()
            finally:
                boz.removedirs()
            assert not foo.exists()
            assert d.exists()
        finally:
            os.remove(tempf)