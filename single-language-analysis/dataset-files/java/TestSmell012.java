// Original URL: https://github.com/gabrielseibel1/MusicSeibuilder/blob/e931ba43f8edab3ec38006ef8476e77425726952/SoundTest.java#L43-L53

public class TestSmell012 {
    @Test
    private void decOctaveTest() throws Exception{
        Sound sound = new Sound();
        assertEquals(5, sound.getOctave());

        for (int i = 0; i < 6; i++){
            sound.decOctave();
        }
        System.out.println(sound.getOctave());
        assertEquals(0, sound.getOctave());
    }
}
