// Original URL: https://github.com/alibaba/alios-libreoffice/blob/e9a6cc08a12b5133a9dccf337d16f9a534f57f1e/bean/qa/complex/bean/OOoBeanTest.java#L94-L110

public class TestSmell078 {
    @Test public void test1() throws Exception
    {
        WriterFrame f = null;
        try
        {
            f = new WriterFrame(100 ,100, 500 ,400, false, connection.getComponentContext());
            f.setText("OOoBean test.");
            Thread.sleep(1000);
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
