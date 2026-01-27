# Original URL: https://github.com/ryfeus/lambda-packs/blob/74b21b9cddb57790c804ab973e26141eb7e5c912/ONNX-ARM/lambda-onnx-arm-3.8/numpy/typing/tests/test_typing.py#L99-L108

@pytest.mark.slow
@pytest.mark.skipif(NO_MYPY, reason="Mypy is not installed")
@pytest.mark.parametrize("path", get_test_cases(PASS_DIR))
def test_smell_125(path):
    # Alias `OUTPUT_MYPY` so that it appears in the local namespace
    output_mypy = OUTPUT_MYPY
    if path in output_mypy:
        msg = "Unexpected mypy output\n\n"
        msg += "\n".join(_strip_filename(v) for v in output_mypy[path])
        raise AssertionError(msg)