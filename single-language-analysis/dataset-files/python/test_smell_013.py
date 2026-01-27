import pytest

class TestTrie:
    def test_smell_013(self):
        simple_t.insert_all(list(to_insert))
        word_map = {}
        for i in range(len(to_insert)):
            if to_insert[i] in word_map:
                freq = word_map[to_insert[i]]
                word_map[to_insert[i]] = freq + 1
            else:
                word_map[to_insert[i]] = 1
        children = simple_t.get_root().get_children()
        if children is not None:
            iterator = iter(children)
            while True:
                try:
                    child = next(iterator)
                    assert child.get_freq() == word_map[child.get_key()]
                except StopIteration:
                    break