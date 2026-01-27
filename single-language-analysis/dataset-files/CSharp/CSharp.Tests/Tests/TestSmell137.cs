using Xunit;

public class TestSmell137
{
    [Fact(Skip = "")]
    public void TestFrameToJsonFloatPrecision()
    {
        double value = 0.95;
        int precision = 1;
        string expectedVal = "1.0";
        
        if (!IS64)
        {
            return;
        }

        var testCases = new (double, int, string)[]
        {
            (0.95, 1, "1.0"),
            (1.95, 1, "2.0"),
            (-1.95, 1, "-2.0"),
            (0.995, 2, "1.0"),
            (0.9995, 3, "1.0"),
            (0.99999999999999944, 15, "1.0"),
        };

        foreach (var (testValue, testPrecision, testExpectedVal) in testCases)
        {
            var df = new DataFrame(new[] { new { a_float = testValue } });
            var encoded = df.ToJson(doublePrecision: testPrecision);
            Assert.Equal($"{{\"a_float\":{{\"0\":{testExpectedVal}}}}}", encoded);
        }
    }
}