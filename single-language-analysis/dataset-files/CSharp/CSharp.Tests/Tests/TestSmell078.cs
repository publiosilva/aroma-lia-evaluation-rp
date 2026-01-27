using Xunit;

public class TestSmell078
{
    [Fact]
    public void Test1()
    {
        WriterFrame f = null;
        try
        {
            f = new WriterFrame(100, 100, 500, 400, false, connection.GetComponentContext());
            f.SetText("OOoBean test.");
            System.Threading.Thread.Sleep(1000);
        }
        finally
        {
            if (f != null)
            {
                f.Dispose();
            }
        }
    }
}