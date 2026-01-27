using Xunit;

public class TestSmell098
{
    [Fact]
    public void TestDates(object args, object fromCLI)
    {
        args = Comm.GetAnonArgs(args);
        if (0 == ((ICollection<object>)args).Count)
        {
            throw new Cex.ArgError("At least one argument is required.  Usage:\n"
                + "splunk test dates \"<string>\" OR\n"
                + "splunk test dates file <filename>");
        }

        string argString = string.Join(" ", args.Select(x => $"\"{x}\""));
        System.Diagnostics.Process.Start("parsetest", argString);
    }
}