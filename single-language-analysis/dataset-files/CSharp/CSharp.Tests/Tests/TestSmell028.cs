using Xunit;

public class TestSmell028
{
    [Fact]
    public void ToBinaryTest()
    {
        var t = new M();

        // Decimal to binary
        t.ToBinary("57", 1);
        string screen2 = M.Screen2.GetText();
        Assert.Equal("111001", screen2);

        t.ToBinary("19991", 1);
        screen2 = M.Screen2.GetText();
        Assert.Equal("100111000010111", screen2);

        t.ToBinary("15", 1);
        screen2 = M.Screen2.GetText();
        Assert.Equal("1111", screen2);

        t.ToBinary("100", 1);
        screen2 = M.Screen2.GetText();
        Assert.Equal("1100100", screen2);

        // HexaDecimal to binary
        t.ToBinary("F", 3);
        screen2 = M.Screen2.GetText();
        Assert.Equal("1111", screen2);

        t.ToBinary("106F", 3);
        screen2 = M.Screen2.GetText();
        Assert.Equal("1000001101111", screen2);

        t.ToBinary("FF1", 3);
        screen2 = M.Screen2.GetText();
        Assert.Equal("111111110001", screen2);

        t.ToBinary("111", 3);
        screen2 = M.Screen2.GetText();
        Assert.Equal("100010001", screen2);
    }
}