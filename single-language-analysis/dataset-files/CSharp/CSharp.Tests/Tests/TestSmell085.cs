using Xunit;

public class TestSmell085
{
    [Fact]
    public void TestCacheSetGetInClearDel()
    {
        foreach (var (key, value) in keysAndValues)
        {
            try
            {
                cache[key];
            }
            catch (KeyNotFoundException)
            {
            }

            cache[key] = value;
            Assert.Equal(value, cache[key]);

            cache[key] = value;
            Assert.Equal(value, cache[key]);
            Assert.True(cache.ContainsKey(key));
            Assert.False(cache.ContainsKey(-999));

            cache.Clear();
            Assert.Null(cache.Get(key));

            cache[key] = value;
            Assert.Equal(value, cache[key]);
            cache.Remove(key);
            Assert.Null(cache.Get(key));

            try
            {
                cache.Remove(key);
            }
            catch (KeyNotFoundException)
            {
            }
        }
    }
}