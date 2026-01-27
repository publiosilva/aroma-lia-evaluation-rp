import pytest

class TestSoundtest:
    def test_smell_009(self):
        sound = Sound()
        sound.set_note('A')
        assert 'A' == sound.get_note()

        sound.silence()
        assert 'R' == sound.get_note()