# Original URL: https://github.com/bofm/python-caching/blob/16de50c119f8896e923e3f10488ecf6ffe535f45/tests/test_cache.py#L46-L64

@pytest.mark.parametrize('key, value', keys_and_values, ids=test_names)
def test_smell_085(cache, key, value):
    with pytest.raises(KeyError):
        cache[key]
    cache[key] = value
    assert cache[key] == value
    # Assert duplicate erors are handled
    cache[key] = value
    assert cache[key] == value
    assert key in cache
    assert -999 not in cache
    cache.clear()
    assert cache.get(key) is None
    cache[key] = value
    assert cache[key] == value
    del cache[key]
    assert cache.get(key) is None
    with pytest.raises(KeyError):
        del cache[key]