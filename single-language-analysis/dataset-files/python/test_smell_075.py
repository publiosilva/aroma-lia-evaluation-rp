import pytest

class TestClobProcessor:
    def test_smell_075(self):
        search_term = "content"
        clob_processor.save_document(None, "This is a test content.")
        # wait for the document to be indexed
        time.sleep(5)
        results = clob_processor.search_contain_document(search_term)
        print(results)
        assert len(results) > 0