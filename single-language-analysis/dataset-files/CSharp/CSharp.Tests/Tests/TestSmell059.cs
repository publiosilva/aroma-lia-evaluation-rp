using Xunit;

public class TestSmell059
{
    [Fact]
    public void ComplexTestEmpty()
    {
        Assert.True(complexT.IsEmpty());
        Assert.Equal(0, complexT.GetTotalFreq());
        Assert.Equal(0, complexT.GetVocabularySize());
    }
}