// Original URL: https://github.com/alibaba/alios-libreoffice/blob/e9a6cc08a12b5133a9dccf337d16f9a534f57f1e/bean/qa/complex/bean/OOoBeanTest.java#L291-L319

public class TestSmell019 {
    @Test public void test4() throws Exception
    {
        WriterFrame f = null;
        try
        {
            f = new WriterFrame(100, 100, 500, 300, false, connection.getComponentContext());
            OOoBean b = f.getBean();
            for (int i = 0; i < 100; i++)
            {
                b.releaseSystemWindow();
                b.aquireSystemWindow();
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
