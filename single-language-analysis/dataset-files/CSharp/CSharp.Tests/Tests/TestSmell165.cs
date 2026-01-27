using Xunit;

public class TestSmell165
{
    [Fact]
    public void TestConstructionFromNone()
    {
        try
        {
            Path(null);
        }
        catch (TypeError)
        {
        }
        else
        {
            throw new Exception("DID NOT RAISE");
        }
    }
}