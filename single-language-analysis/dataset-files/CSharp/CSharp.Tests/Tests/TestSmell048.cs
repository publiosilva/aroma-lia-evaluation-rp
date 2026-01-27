using Xunit;

public class TestSmell048
{
    [Fact]
    public void Test5()
    {
        WriterFrame f = null;
        try
        {
            f = new WriterFrame(100, 100, 500, 400, false, connection.GetComponentContext());
            f.GoToStart();
            f.PageDown();
            System.Threading.Thread.Sleep(1000);

            ScreenComparer capturer = new ScreenComparer(100, 100, 500, 400);
            capturer.GrabOne();
            for (int i = 0; i < 100; i++)
            {
                f.RemoveOOoBean();
                f.AddOOoBean();
            }

            f.GoToStart();
            f.PageDown();
            System.Threading.Thread.Sleep(GetSleepTime(200));
            capturer.GrabTwo();

            if (!capturer.Compare())
            {
                Assert.True(false, "Painting error: adding and removing OOoBean repeatedly to java.lang.Frame.");
                capturer.WriteImages();
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