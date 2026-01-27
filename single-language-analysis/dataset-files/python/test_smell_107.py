# Original URL: https://github.com/bofm/python-caching/blob/16de50c119f8896e923e3f10488ecf6ffe535f45/tests/test_cache.py#L301-L327

@pytest.mark.parametrize('storage', ['file', 'memory'])
def test_smell_107(tmpdir, storage):
    filepath = None if storage == 'memory' else f'{tmpdir}/cache'
    cache = Cache(filepath=filepath, maxsize=2, ttl=-1, policy='LFU')

    @cache
    def func(a):
        return a

    def keys():
        return [arg for (fn_name, arg), v in cache.items()]

    assert func(1) == 1
    assert func(2) == 2
    the_keys = keys()
    assert len(the_keys) == 2
    assert 1 in the_keys and 2 in the_keys

    assert func(1) == 1
    assert func(1) == 1
    assert func(2) == 2
    assert func(2) == 2
    assert func(3) == 3
    the_keys = keys()
    assert len(the_keys) == 2
    assert 1 in the_keys and 2 in the_keys
    assert 3 not in the_keys