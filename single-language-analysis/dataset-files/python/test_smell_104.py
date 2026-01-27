# Original URL: https://github.com/OphisMusic/ophis/blob/afd3f6ab9aab9de57eaf633caaf24d0e7b5c74ad/tests/test_tonus.py#L132-L142

# Takes a long time... creates 6545 combinations
def test_smell_104():
    for x, y, z in itertools.combinations(ophis.western_chroma_set, 3):
        s = ophis.ChromaSet({x, y, z})
        s_dim = s.diminish()
        for chroma in s:
            assert chroma.diminish() in s_dim
        #for i in range(12):
        #    s_dim = s.diminish(i)
        #    for chroma in s:
        #        assert chroma.diminish(i) in s_dim