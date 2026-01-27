// Original URL: https://github.com/alibaba/alios-libreoffice/blob/e9a6cc08a12b5133a9dccf337d16f9a534f57f1e/bean/qa/complex/bean/OOoBeanTest.java#L324-L371

public class TestSmell048 {
    @Test public void test5() throws Exception
    {
        WriterFrame f = null;
        try
        {
            f = new WriterFrame(100, 100, 500, 400, false, connection.getComponentContext());
            f.goToStart();
            f.pageDown();
            Thread.sleep(1000);

            ScreenComparer capturer = new ScreenComparer(100,100,500,400);
            capturer.grabOne();
            for (int i = 0; i < 100; i++)
            {
                f.removeOOoBean();
                f.addOOoBean();
            }

            f.goToStart();
            f.pageDown();
            Thread.sleep(getSleepTime(200));
            capturer.grabTwo();

            if (!capturer.compare())
            {
                fail("Painting error: adding and removing OOoBean " +
                       "repeatedly to java.lang.Frame.");
                capturer.writeImages();
            }

            if (!f.checkUnoFramePosition())
            {
                fail("Sizing error.");
            }

        }
        finally
        {
            if (f != null)
            {
                f.dispose();
            }
            if (!isWindows())
            {
                Thread.sleep(10000);
            }
        }
    }
}
