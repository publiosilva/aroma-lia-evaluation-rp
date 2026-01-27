# Original URL: https://github.com/fuatnku/seleniumhq.github.io/blob/76361bf094b4a044d1250079cb06f68dfb0a5027/examples/python/tests/browsers/test_firefox.py#L9-L13

def test_smell_166():
    options = webdriver.FirefoxOptions()
    driver = webdriver.Firefox(options=options)

    driver.quit()