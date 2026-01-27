# Original URL: https://github.com/OphisMusic/ophis/blob/afd3f6ab9aab9de57eaf633caaf24d0e7b5c74ad/tests/test_tonus.py#L34-L39

def test_smell_090():
    assert ophis.FSHARP in ophis.GFLAT.enharmonics()
    assert ophis.GFLAT.enharmonics(False, "chroma")
    for chroma in ophis.western_chroma_set:
        for enharmonic_note in chroma.enharmonics():
            assert chroma == enharmonic_note