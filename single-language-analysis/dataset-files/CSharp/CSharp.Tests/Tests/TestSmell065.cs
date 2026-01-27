using Xunit;

public class TestSmell065
{
    [Fact]
    public void Test_Remove9()
    {
        System.Console.WriteLine("Test first left of right child");
        Tree<int> s = new Tree<int>();
        s.Add(4);
        s.Add(2);
        s.Add(3);
        s.Add(1);
        s.Add(6);
        s.Add(7);
        s.Remove(4);
        Assert.Equal(true, s.CheckContains(2) && s.CheckContains(4) == false && s.CheckContains(3) && s.CheckContains(1) && s.CheckContains(6) && s.CheckContains(7));
    }
}