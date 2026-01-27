using Xunit;

public class TestSmell101
{
    [Theory]
    [InlineData("datetime64[ns]")]
    [InlineData("datetime64[ns, UTC]")]
    public void TestAstypeCopies(string dtype)
    {
        string[] otherValues = { "datetime64[ns]", "datetime64[ns, UTC]", "datetime64[ns, CET]" };
        
        foreach (var other in otherValues)
        {
            var ser = new Series(new[] { 1, 2 }, dtype);
            var orig = ser.Copy();

            bool err = false;
            if ((dtype == "datetime64[ns]") ^ (other == "datetime64[ns]"))
            {
                err = true;
            }

            if (err)
            {
                string msg;
                if (dtype == "datetime64[ns]")
                {
                    msg = "Use obj.tz_localize instead or series.dt.tz_localize instead";
                }
                else
                {
                    msg = "from timezone-aware dtype to timezone-naive dtype";
                }
                try
                {
                    ser.Astype(other);
                }
                catch (TypeError ex) when (ex.Message.Contains(msg))
                {
                    // Expected exception
                }
            }
            else
            {
                var t = ser.Astype(other);
                t[:] = NaT;
                Assert.Equal(orig, ser);
            }
        }
    }
}