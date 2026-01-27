using Xunit;

public class TestSmell012
{
    [Fact]
    public void DecOctaveTest()
    {
        Sound sound = new Sound();
        Assert.Equal(5, sound.GetOctave());

        for (int i = 0; i < 6; i++)
        {
            sound.DecOctave();
        }
        System.Console.WriteLine(sound.GetOctave());
        Assert.Equal(0, sound.GetOctave());
    }
}