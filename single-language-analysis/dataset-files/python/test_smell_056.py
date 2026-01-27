import pytest

class TestFastMath:
    @pytest.mark.skip
    def test_smell_056(self):
        self.compare_class_methods(FastMath, StrictMath)

    def compare_class_methods(self, class1, class2):
        pass