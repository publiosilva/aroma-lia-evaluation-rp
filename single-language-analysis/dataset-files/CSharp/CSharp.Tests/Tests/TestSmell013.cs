using Xunit;

public class TestSmell013
{
    [Fact]
    public void SimpleTestFrequencies()
    {
        simpleT.InsertAll(new List<string>(toInsert));
        Dictionary<string, int> wordMap = new Dictionary<string, int>();
        for (int i = 0; i < toInsert.Length; i++)
        {
            if (wordMap.ContainsKey(toInsert[i]))
            {
                int freq = wordMap[toInsert[i]];
                wordMap[toInsert[i]] = freq + 1;
            }
            else
            {
                wordMap[toInsert[i]] = 1;
            }
        }
        ICollection<TrieNode> children = simpleT.GetRoot().GetChildren();
        if (children != null)
        {
            IEnumerator<TrieNode> iterator = children.GetEnumerator();
            while (iterator.MoveNext())
            {
                TrieNode child = iterator.Current;
                Assert.Equal(child.GetFreq(), (int)wordMap[child.GetKey()]);
            }
        }
    }
}