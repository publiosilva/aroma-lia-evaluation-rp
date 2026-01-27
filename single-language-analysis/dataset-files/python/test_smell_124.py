# Original URL: https://github.com/suds-community/suds/blob/fae24d440cd9357070ab56748b3774b2b4bbf21c/tests/test_suds.py#L231-L238

def test_smell_124(monkeypatch):
    monkeypatch.delitem(locals(), "e", False)
    e = pytest.raises(xml.sax.SAXParseException, testutils.client_from_wsdl,
        b"")
    try:
        assert e.value.getMessage() == "no element found"
    finally:
        del e  # explicitly break circular reference chain in Python 3
