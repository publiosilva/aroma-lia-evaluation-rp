import pytest
import os

class TestGitTest:
    def test_smell_002(self):
        Git.initialize()

        assert os.path.isfile("index")
        assert os.path.isdir("objects")