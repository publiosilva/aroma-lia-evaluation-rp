using Xunit;

public class TestSmell019
{
    [Fact]
    public void Test4()
    {
        WriterFrame f = null;
        try
        {
            f = new WriterFrame(100, 100, 500, 300, false, connection.GetComponentContext());
            OOoBean b = f.GetBean();
            for (int i = 0; i < 100; i++)
            {
                b.ReleaseSystemWindow();
                b.AquireSystemWindow();
            }
            if (!f.CheckUnoFramePosition())
            {
                Assert.True(false, "Sizing error.");
            }
        }
        finally
        {
            if (f != null)
            {
                f.Dispose();
            }
            if (!IsWindows())
            {
                System.Threading.Thread.Sleep(10000);
            }
        }
    }
}