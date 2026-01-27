using Xunit;

public class TestSmell073
{
    [Fact]
    public void Test2()
    {
        WriterFrame f = null;
        ScreenComparer capturer = null;
        try
        {
            f = new WriterFrame(100, 100, 500, 500, false, connection.GetComponentContext());
            if (!f.CheckUnoFramePosition())
            {
                Assert.True(false, "Sizing error: Client are of Java frame does not match the UNO window.");
            }
            capturer = new ScreenComparer(100, 100, 500, 500);

            //Minimize Window and back
            f.GoToStart();
            f.PageDown();
            System.Threading.Thread.Sleep(1000);
            for (int i = 0; i < 3; i++)
            {
                capturer.Reset();
                capturer.GrabOne(f.GetClientArea());
                f.SetExtendedState(Frame.ICONIFIED);
                System.Threading.Thread.Sleep(GetSleepTime(200));
                if (!f.CheckUnoFramePosition())
                {
                    Assert.True(false, "Sizing error: Frame was iconified.");
                }
                f.SetExtendedState(Frame.NORMAL);
                System.Threading.Thread.Sleep(GetSleepTime(200));
                if (!f.CheckUnoFramePosition())
                {
                    Assert.True(false, "Sizing error: Frame size set back to normal after it was iconified.");
                }
                capturer.GrabTwo(f.GetClientArea());
                if (!capturer.Compare())
                {
                    Assert.True(false, "Painting error: Minimize (iconify) frame and back to normal size.");
                    capturer.WriteImages();
                }
            }

            //Maximize Window and back to normal
            for (int i = 0; i < 3; i++)
            {
                capturer.Reset();
                capturer.GrabOne(f.GetClientArea());
                f.SetExtendedState(Frame.MAXIMIZED_BOTH);
                System.Threading.Thread.Sleep(GetSleepTime(200));
                if (!f.CheckUnoFramePosition())
                {
                    Assert.True(false, "Sizing error: Frame maximized.");
                }
                f.SetExtendedState(Frame.NORMAL);
                System.Threading.Thread.Sleep(GetSleepTime(200));
                if (!f.CheckUnoFramePosition())
                {
                    Assert.True(false, "Sizing error: Frame set from maximized to normal.");
                }
                capturer.GrabTwo(f.GetClientArea());
                if (!capturer.Compare())
                {
                    Assert.True(false, "Painting error: Maximize frame and back to normal size");
                    capturer.WriteImages();
                }
            }

            //move Window top left
            capturer.Reset();
            capturer.GrabOne(f.GetClientArea());
            Rectangle oldPosition = f.GetBounds();
            f.SetBounds(0, 0, oldPosition.Width, oldPosition.Height);
            System.Threading.Thread.Sleep(GetSleepTime(200));
            if (!f.CheckUnoFramePosition())
            {
                Assert.True(false, "Sizing error: Frame moved.");
            }

            capturer.GrabTwo(f.GetClientArea());
            if (!capturer.Compare())
            {
                Assert.True(false, "Painting error: Move frame to a different position.");
                capturer.WriteImages();
            }

            //move Window down
            Dimension dim = Toolkit.GetDefaultToolkit().GetScreenSize();
            int maxY = dim.Height - f.GetBounds().Height;

            int curY = 0;
            while (curY < maxY)
            {
                capturer.Reset();
                capturer.GrabOne(f.GetClientArea());
                oldPosition = f.GetBounds();
                f.SetBounds(0, curY, oldPosition.Width, oldPosition.Height);
                capturer.GrabTwo(f.GetClientArea());
                if (!capturer.Compare())
                {
                    Assert.True(false, "Painting error: Move frame to a different position.");
                    capturer.WriteImages();
                }
                curY += 50;
                System.Threading.Thread.Sleep(GetSleepTime(200));
            }

            //obscure the window and make it visible again

            oldPosition = f.GetBounds();

            Rectangle pos = new Rectangle(oldPosition.X - 50, oldPosition.Y - 50,
                                          oldPosition.Width, oldPosition.Height);
            Frame coverFrame = new Frame();
            coverFrame.SetBounds(pos);
            capturer.Reset();
            capturer.GrabOne(f.GetClientArea());

            for (int i = 0; i < 3; i++)
            {
                coverFrame.SetVisible(true);
                System.Threading.Thread.Sleep(GetSleepTime(200));
                f.ToFront();
                System.Threading.Thread.Sleep(GetSleepTime(200));
                if (!f.CheckUnoFramePosition())
                {
                    Assert.True(false, "Sizing error: Frame moved from back to front.");
                }

                capturer.GrabTwo(f.GetClientArea());
                if (!capturer.Compare())
                {
                    Assert.True(false, "Painting error: Move frame to back and to front.");
                    capturer.WriteImages();
                }
            }

            coverFrame.Dispose();
        }
        finally
        {
            if (f != null)
            {
                f.Dispose();
            }
        }
    }

    private int GetSleepTime(int time)
    {
        return time;
    }
}