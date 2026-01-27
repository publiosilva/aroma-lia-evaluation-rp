using Xunit;

public class TestSmell007
{
    [Fact]
    public void TestSubtraction()
    {
        string result = Main.ToDoTheOperation(Main.Recognize("10-10-10-10"));
        Assert.Equal("-20.0", result);
        result = Main.ToDoTheOperation(Main.Recognize("0-0"));
        Assert.Equal("0.0", result);
        result = Main.ToDoTheOperation(Main.Recognize("10-10-10-20"));
        Assert.Equal("-30.0", result);
        result = Main.ToDoTheOperation(Main.Recognize("1-1"));
        Assert.Equal("0.0", result);
        result = Main.ToDoTheOperation(Main.Recognize("10-10-10-10-10-10-10-10-10-10-10-10"));
        Assert.Equal("-100.0", result);
        result = Main.ToDoTheOperation(Main.Recognize("0-25-25-25"));
        Assert.Equal("-75.0", result);
    }
}