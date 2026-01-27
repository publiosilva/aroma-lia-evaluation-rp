import pytest

class TestSoundTest:
    def test_smell_023(self):
        sound = Sound()
        assert 5 == sound.get_octave()

        sound.inc_octave()
        sound.reset_octave()
        assert 5 == sound.get_octave()