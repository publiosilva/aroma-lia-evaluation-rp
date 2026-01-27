import pytest

class TestPojoTest:
    def test_smell_082(self):
        package_name = "com.example.myapp"  # Your package name
        ignored_classes = set()
        ignored_classes.add(CustomException)  # Example of ignoring a specific exception
        PojoTestUtility.test_all_pojos_in_package(package_name, ignored_classes)