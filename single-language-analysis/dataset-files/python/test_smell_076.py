import pytest

class TestCalculator:
    def test(self):
        driver.get("calc.exe")
        driver.switch_to.window("Calculator")
        time.sleep(1)
        driver.find_element(By.ID, "133").click()  # 3
        time.sleep(1)
        driver.find_element(By.ID, "93").click()  # +
        time.sleep(1)
        driver.find_element(By.ID, "133").click()  # 3
        time.sleep(1)
        driver.find_element(By.ID, "121").click()  # =
        time.sleep(1)
        assert "3 + 3 did not produce 6 as expected." == "6", driver.find_element(By.ID, "150").text
        driver.find_element(By.ID, "81").click()  # Clear "C" button
        time.sleep(1)
        driver.close()