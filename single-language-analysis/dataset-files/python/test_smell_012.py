import pytest

class TestSoundTest:
    def test_smell_012(self):
        sound = Sound()
        assert 5 == sound.get_octave()

        for i in range(6):
            sound.dec_octave()
        print(sound.get_octave())
        assert 0 == sound.get_octave()