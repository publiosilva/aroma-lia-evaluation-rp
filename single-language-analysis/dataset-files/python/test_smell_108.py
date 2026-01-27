# Original URL: https://github.com/romilly/quick2wire-python-api/blob/c5e21e9d804012efd9d214d18909034b4b898c96/quick2wire/test_gpio.py#L56-L64

class TestGPIO:

    def test_smell_108(self):
        pin = pins.pin(0, Out)
        
        assert pin.direction == Out
        assert not os.path.exists("/sys/class/gpio/gpio17/direction")
        
        with pin:
            assert content_of("/sys/class/gpio/gpio17/direction") == "out\n"
            assert pin.direction == Out