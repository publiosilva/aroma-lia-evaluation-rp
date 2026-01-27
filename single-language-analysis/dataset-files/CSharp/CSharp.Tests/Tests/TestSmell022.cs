using Xunit;

public class TestSmell022 {
    [Fact]
    public void BasicTest(CuckooHashLong<LongKey, string> map, double load, int expectedCapacity) {
        System.Console.WriteLine("Capacity: " + map.Capacity() + " HashFuncs: " + map.GetNumHashFuncs() + " Buckets: " + map.GetNumBuckets() + " Load: " + load);
        long time = System.DateTimeOffset.Now.ToUnixTimeMilliseconds();
        var keys = new List<LongKey>();
        for (int i = 0; i < map.Capacity() * load; ++i) {
            keys.Add(new LongKey(random.NextLong()));
        }

        for (int i = 0; i < keys.Count; ++i) {
            LongKey key = keys[i];
            string v = key.x.ToString();
            map.Put(key, v);
            Assert.True(map.ContainsKey(key));
            Assert.Equal(v, map.Get(key));
        }

        for (int i = 0; i < keys.Count; ++i) {
            LongKey key = keys[i];
            string v = key.x.ToString();
            Assert.Equal(v, map.Get(key));
        }

        Assert.Equal(expectedCapacity, map.Capacity());
        long duration = System.DateTimeOffset.Now.ToUnixTimeMilliseconds() - time;
        System.Console.WriteLine(duration + " ms");
    }
}