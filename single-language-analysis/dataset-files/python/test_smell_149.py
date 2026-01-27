# Original URL: https://github.com/geektime-geekbang/Geek_AppAutomationTesting/blob/f3b277444e2b6627a3e7adab71d350002445491e/Demo/test_demo.py#L103-L109

class TestDemo:

    def test_smell_149(self):
        self.driver.find_element_by_xpath("//*[@text='交易']").click()
        for i in range(5):
            sleep(1)
            print(self.driver.contexts)

        self.driver.find_element_by_accessibility_id("A股开户").click()