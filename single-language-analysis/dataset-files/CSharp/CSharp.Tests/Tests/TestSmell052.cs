using Xunit;

public class TestSmell052 {
    [Fact(Skip = "")]
    public void PathOverlapsAreMarkedWithRightCursor() {
        MarsRover marsRover = new MarsRover("ssssssrsss").TurnRight()
                .MoveForward().MoveForward().MoveForward().TurnRight()
                .MoveForward().MoveForward().MoveForward().MoveForward();

        string expectedPath = new StringBuilder().Append("   *   ")
                .Append(System.Environment.NewLine).Append("X--+--+")
                .Append(System.Environment.NewLine).Append("   |  |")
                .Append(System.Environment.NewLine).Append("   |  |")
                .Append(System.Environment.NewLine).Append("   +--+")
                .Append(System.Environment.NewLine).ToString();

        Assert.Equal(expectedPath, marsRover.Path());
    }
}