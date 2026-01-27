import pytest

class TestGitTest:
    def test_smell_004(self):
        g = Git()
        g.initialize()
        g.add_blob("a.txt")
        g.write_to_index()
        reader = open("index", "r")
        line = reader.readline()
        hm = g.hm
        while line:
            parts = line.split(" : ")
            assert len(parts) == 2
            file_name = parts[0]
            hash = parts[1]
            assert file_name in hm
            assert hm[file_name] == hash
            line = reader.readline()
        reader.close()