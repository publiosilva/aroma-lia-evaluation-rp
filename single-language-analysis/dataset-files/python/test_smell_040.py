import pytest
import os
import tempfile

class TestFunctest:
    def test_smell_040(self):
        fake_json_data = "Deathcounter: 0"
        try:
            temp_file_path = tempfile.NamedTemporaryFile(delete=False, suffix=".json")
            with open(temp_file_path.name, 'w') as f:
                f.write(fake_json_data)

            result = func.read_json_from_file()

            assert 0 == result

            os.remove(temp_file_path.name)
        except IOError as e:
            print(e)