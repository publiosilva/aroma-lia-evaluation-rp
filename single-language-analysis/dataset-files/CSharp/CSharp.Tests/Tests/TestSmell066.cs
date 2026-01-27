using Xunit;

public class TestSmell066
{
    [Fact(Skip = "")]
    public void DriveEstThanTurnLeft()
    {
        string expectedPath = new StringBuilder().Append("    *")
                .Append(System.Environment.NewLine).Append("    |").Append(System.Environment.NewLine)
                .Append("    |").Append(System.Environment.NewLine).Append("    |")
                .Append(System.Environment.NewLine).Append("X---+").Append(System.Environment.NewLine)
                .ToString();
        System.Console.WriteLine(expectedPath);
        Assert.Equal(expectedPath, new MarsRover("sssslssss").Path());
    }
}