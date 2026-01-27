using Xunit;

public class TestSmell090
{
    [Fact]
    public void TestEnharmonics()
    {
        Assert.True(ophis.FSharp in ophis.GFlat.Enharmonics());
        Assert.True(ophis.GFlat.Enharmonics(false, "chroma"));
        foreach (var chroma in ophis.WesternChromaSet)
        {
            foreach (var enharmonicNote in chroma.Enharmonics())
            {
                Assert.Equal(chroma, enharmonicNote);
            }
        }
    }
}