import pytest

class TestClobProcessor:
    def test_smell_069(self):
        content = "Safe searchable content."
        clob_processor.save_document(None, content)
        # wait for the document to be indexed
        time.sleep(5)
        results = clob_processor.search_free_text_document("contents")
        print(results)
        assert len(results) > 0