// Original URL: https://github.com/gabrielseibel1/MusicSeibuilder/blob/e931ba43f8edab3ec38006ef8476e77425726952/SoundTest.java#L15-L23

public class TestSmell023 {
    @Test
    public void resetOctaveTest() throws Exception {
        Sound sound = new Sound();
        assertEquals(5, sound.getOctave());

        sound.incOctave();
        sound.resetOctave();
        assertEquals(5, sound.getOctave());
    }
}
