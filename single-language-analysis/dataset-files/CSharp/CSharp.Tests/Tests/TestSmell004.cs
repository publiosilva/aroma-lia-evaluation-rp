using Xunit;

public class TestSmell004
{
    [Fact]
    public void TestWriteToIndex()
    {
        Git g = new Git();
        g.Initialize();
        g.AddBlob("a.txt");
        g.WriteToIndex();
        using (var reader = new System.IO.StreamReader("index"))
        {
            string line;
            var hm = g.Hm;
            while ((line = reader.ReadLine()) != null)
            {
                string[] parts = line.Split(" : ");
                Assert.Equal(2, parts.Length);
                string fileName = parts[0];
                string hash = parts[1];
                Assert.True(hm.ContainsKey(fileName));
                Assert.Equal(hm[fileName], hash);
            }
        }
    }
}