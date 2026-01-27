using Xunit;

public class TestSmell107
{
    [Theory]
    [InlineData("file")]
    [InlineData("memory")]
    public void TestLfu(string storage)
    {
        string filepath = storage == "memory" ? null : $"{tmpdir}/cache";
        var cache = new Cache(filepath: filepath, maxsize: 2, ttl: -1, policy: "LFU");

        Func<int, int> func = a => a;

        List<int> Keys()
        {
            return cache.Items.Select(item => item.Key.Item2).ToList();
        }

        Assert.Equal(1, func(1));
        Assert.Equal(2, func(2));
        var theKeys = Keys();
        Assert.Equal(2, theKeys.Count);
        Assert.True(theKeys.Contains(1) && theKeys.Contains(2));

        Assert.Equal(1, func(1));
        Assert.Equal(1, func(1));
        Assert.Equal(2, func(2));
        Assert.Equal(2, func(2));
        Assert.Equal(3, func(3));
        theKeys = Keys();
        Assert.Equal(2, theKeys.Count);
        Assert.True(theKeys.Contains(1) && theKeys.Contains(2));
        Assert.False(theKeys.Contains(3));
    }
}