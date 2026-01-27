# Original URL: https://github.com/mossprescott/pynand/blob/e02f534d7afe7ed6ac4f4e343287ef0e4e69e024/test_10.py#L42-L48

def test_smell_126():
    try:
        project_10.lex("12345678")

        assert False
    except:
        pass