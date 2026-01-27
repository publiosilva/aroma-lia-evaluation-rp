using Xunit;

public class TestSmell001
{
    [Fact]
    public void FileIOLocation()
    {
        var locations = FileIO.ReadLocationFile("location.csv");

        Assert.Equal(locations.PeekFirst().GetName(), "Perth");

        var map = FileIO.ReadDistanceFile("distances.csv", locations);

        Assert.Equal(locations.GetCount(), 14);
        Assert.Equal(map.GetNodeCount(), 11);
        Assert.Equal(map.GetEdgeCount(), 62);

        double temp = map.GetEdges().PeekFirst().FindWeight("walk").GetLength();
        Assert.Equal(temp, 13.1, 0.0001);

        int temp1 = map.GetEdges().PeekFirst().FindWeight("car").GetPkTime();
        Assert.Equal(temp1, 24);
    }
}