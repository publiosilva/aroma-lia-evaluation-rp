# Original URL: https://github.com/romilly/quick2wire-python-api/blob/c5e21e9d804012efd9d214d18909034b4b898c96/quick2wire/test_gpio.py#L10-L23

class TestGPIO:

    def test_smell_123(self):
        pin = pins.pin(0)
        
        with pytest.raises(IOError):
            pin.value
        
        pin.open()
        try:
            pin.value
        finally:
            pin.close()
        
        with pytest.raises(IOError):
            pin.value