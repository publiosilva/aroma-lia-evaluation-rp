# Original URL: https://github.com/bofm/python-caching/blob/16de50c119f8896e923e3f10488ecf6ffe535f45/tests/test_cache.py#L330-L368

def test_smell_106():

    x = 2
    call_count = 0
    raised = False
    n = 0

    @Cache(only_on_errors=(ZeroDivisionError, ConnectionError))
    def fn():
        nonlocal x, n, call_count, raised
        call_count += 1
        try:
            0 / x
        except ZeroDivisionError:
            raised = True
            raise
        n += 1
        x -= 1
        return n

    assert fn() == 1
    assert call_count == 1
    assert fn() == 2
    assert call_count == 2
    assert x == 0
    assert fn() == 2  # ZeroDivision and returning cached result
    assert call_count == 3
    assert raised
    assert fn() == 2
    x = 1
    raised = False
    assert fn() == 3
    assert call_count == 5
    assert fn() == 3  # ZeroDivision and returning cached result
    assert raised
    assert call_count == 6
    fn._cache.clear()
    with pytest.raises(ZeroDivisionError):
        fn()