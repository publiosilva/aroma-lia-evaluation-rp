using Xunit;

public class TestSmell070 {
   [Fact]
   public void TestEDI_850xml() {
      string[] m = null;
      try {
          m = EDI.ProcessFile("edi/sampledata/ACME_XML_order.xml", "", "", "", false, false, 0, 0, "");
          if (m[0].Equals("0")) {
              System.Console.WriteLine("sample 850xml...   pass");
          } else {
              System.Console.WriteLine("sample 850xml...   fail");
              System.Console.WriteLine("m[1] message: " + m[1]);
          }
      } catch (System.Exception e) {
          System.Console.WriteLine("BS Exception: " + e.Message);
      }
      Assert.Equal("0", m[0]);
   }
}