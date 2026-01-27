# Original URL: https://github.com/romilly/quick2wire-python-api/blob/c5e21e9d804012efd9d214d18909034b4b898c96/quick2wire/test_gpio.py#L80-L89

class TestGPIO:

    def test_smell_128(self):
        with pins.pin(0, Out) as pin:
            pin.value = 1
        
        gpio_admin("export", 17, PullDown)
        try:
            assert content_of('/sys/class/gpio/gpio17/value') == '0\n'
            assert content_of('/sys/class/gpio/gpio17/direction') == 'in\n'
        finally:
            gpio_admin("unexport", 17)