import pytest

class TestHelpTest:
    def test_smell_057(self):
        Help.view()
        user = mock(Ui)
        when(user.get_valid_int()).then_return(4)
        assert 4 == Ui.get_valid_int()