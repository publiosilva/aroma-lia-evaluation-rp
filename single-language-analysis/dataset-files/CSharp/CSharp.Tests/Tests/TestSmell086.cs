using Xunit;

public class TestSmell086
{
    [Fact]
    public void TestAttributesAndItems()
    {
        var g = gpustat.NewQuery()[1]; // includes N/A
        System.Console.WriteLine("(keys) : " + string.Join(", ", g.Keys));
        System.Console.WriteLine(g);

        Assert.Equal(g.Entry["name"], g["name"]);
        Assert.Equal(g.Uuid, g["uuid"]);

        try
        {
            var unknownKey = g["unknown_key"];
        }
        catch (KeyNotFoundException)
        {
        }

        System.Console.WriteLine("uuid : " + g.Uuid);
        System.Console.WriteLine("name : " + g.Name);
        System.Console.WriteLine("memory : used " + g.MemoryUsed + " total " + g.MemoryTotal + " avail " + g.MemoryAvailable);
        System.Console.WriteLine("temperature : " + g.Temperature);
        System.Console.WriteLine("utilization : " + g.Utilization);
        System.Console.WriteLine("utilization_enc : " + g.UtilizationEnc);
        System.Console.WriteLine("utilization_dec : " + g.UtilizationDec);
    }
}