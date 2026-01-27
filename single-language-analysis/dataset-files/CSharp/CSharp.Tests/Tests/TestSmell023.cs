using Xunit;

public class TestSmell023
{
    [Fact]
    public void ResetOctaveTest()
    {
        Sound sound = new Sound();
        Assert.Equal(5, sound.GetOctave());

        sound.IncOctave();
        sound.ResetOctave();
        Assert.Equal(5, sound.GetOctave());
    }
}