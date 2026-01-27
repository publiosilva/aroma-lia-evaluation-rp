// Original URL: https://github.com/gabrielseibel1/MusicSeibuilder/blob/e931ba43f8edab3ec38006ef8476e77425726952/SoundTest.java#L78-L86

public class TestSmell009 {
    @Test
    public void silence() throws Exception {
        Sound sound = new Sound();
        sound.setNote('A');
        assertEquals('A',sound.getNote());

        sound.silence();
        assertEquals('R',sound.getNote());
    }
}
