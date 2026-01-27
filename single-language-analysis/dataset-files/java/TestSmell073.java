// Original URL: https://github.com/alibaba/alios-libreoffice/blob/e9a6cc08a12b5133a9dccf337d16f9a534f57f1e/bean/qa/complex/bean/OOoBeanTest.java#L114-L258

public class TestSmell073 {
    @Test public void test2() throws Exception
    {
        WriterFrame f = null;
        ScreenComparer capturer = null;
        try
        {
            f = new WriterFrame(100, 100, 500,500, false, connection.getComponentContext());
            if (!f.checkUnoFramePosition())
            {
                fail("Sizing error: Client are of Java frame does not match the UNO window.");
            }
            capturer = new ScreenComparer(100, 100, 500, 500);

            //Minimize Window and back
            f.goToStart();
            f.pageDown();
            Thread.sleep(1000);
            for (int i = 0; i < 3; i++)
            {
                capturer.reset();
                capturer.grabOne(f.getClientArea());
                f.setExtendedState(Frame.ICONIFIED);
                Thread.sleep(getSleepTime(200));
                if (!f.checkUnoFramePosition())
                {
                    fail("Sizing error: Frame was iconified.");
                }
                f.setExtendedState(Frame.NORMAL);
                Thread.sleep(getSleepTime(200));
                if (!f.checkUnoFramePosition())
                {
                    fail("Sizing error: Frame size set back to normal after it was iconified.");
                }
                capturer.grabTwo(f.getClientArea());
                if (!capturer.compare())
                {
                    fail("Painting error: Minimize (iconify) frame and back to normal size.");
                    capturer.writeImages();
                }
            }

            //Maximize Window and back to normal
            for (int i = 0; i < 3; i++)
            {
                capturer.reset();
                capturer.grabOne(f.getClientArea());
                f.setExtendedState(Frame.MAXIMIZED_BOTH);
                Thread.sleep(getSleepTime(200));
                if (!f.checkUnoFramePosition())
                {
                    fail("Sizing error: Frame maximized.");
                }
                f.setExtendedState(Frame.NORMAL);
                Thread.sleep(getSleepTime(200));
                if (!f.checkUnoFramePosition())
                {
                    fail("Sizing error: Frame set from maximized to normal.");
                }
                capturer.grabTwo(f.getClientArea());
                if (!capturer.compare())
                {
                    fail("Painting error: Maximize frame and back to normal size");
                    capturer.writeImages();
                }
            }

            //move Window top left
            capturer.reset();
            capturer.grabOne(f.getClientArea());
            Rectangle oldPosition = f.getBounds();
            f.setBounds(0, 0, oldPosition.width, oldPosition.height);
            Thread.sleep(getSleepTime(200));
            if (!f.checkUnoFramePosition())
            {
                fail("Sizing error: Frame moved.");
            }

            capturer.grabTwo(f.getClientArea());
            if (!capturer.compare())
            {
                fail("Painting error: Move frame to a different position.");
                capturer.writeImages();
            }

            //move Window down
            Dimension dim = Toolkit.getDefaultToolkit().getScreenSize();
            int maxY = dim.height - f.getBounds().height;

            int curY = 0;
            while (curY < maxY)
            {
                capturer.reset();
                capturer.grabOne(f.getClientArea());
                oldPosition = f.getBounds();
                f.setBounds(0, curY, oldPosition.width, oldPosition.height);
                capturer.grabTwo(f.getClientArea());
                if (!capturer.compare())
                {
                    fail("Painting error: Move frame to a different position.");
                    capturer.writeImages();
                }
                curY+= 50;
                Thread.sleep(getSleepTime(200));
            }

            //obscure the window and make it visible again

            oldPosition = f.getBounds();

            Rectangle pos = new Rectangle(oldPosition.x - 50, oldPosition.y - 50,
                                          oldPosition.width, oldPosition.height);
            Frame coverFrame = new Frame();
            coverFrame.setBounds(pos);
            capturer.reset();
            capturer.grabOne(f.getClientArea());

            for (int i = 0; i < 3; i++)
            {
                coverFrame.setVisible(true);
                Thread.sleep(getSleepTime(200));
                f.toFront();
                Thread.sleep(getSleepTime(200));
                if (!f.checkUnoFramePosition())
                {
                    fail("Sizing error: Frame moved from back to front.");
                }

                capturer.grabTwo(f.getClientArea());
                if (!capturer.compare())
                {
                    fail("Painting error: Move frame to back and to front.");
                    capturer.writeImages();
                }
            }

            coverFrame.dispose();
        }
        finally
        {
            if (f != null)
            {
                f.dispose();
            }
        }
    }
}
