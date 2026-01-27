using Xunit;

public class TestSmell163
{
    [Fact]
    public void TestSourcetypes()
    {
        var ParamsReq = new[] { ARG_FILE };
        var ParamsOpt = new string[] { };
        Comm.ValidateArgs(ParamsReq, ParamsOpt, Args);
        System.Diagnostics.Process.Start("classify", $"\"{Args[ARG_FILE]}\"");
    }
}