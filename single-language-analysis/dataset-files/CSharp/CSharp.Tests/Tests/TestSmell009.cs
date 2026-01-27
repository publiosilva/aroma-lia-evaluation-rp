using Xunit;

public class TestSmell009
{
    [Fact]
    public void Silence()
    {
        Sound sound = new Sound();
        sound.SetNote('A');
        Assert.Equal('A', sound.GetNote());

        sound.Silence();
        Assert.Equal('R', sound.GetNote());
    }
}