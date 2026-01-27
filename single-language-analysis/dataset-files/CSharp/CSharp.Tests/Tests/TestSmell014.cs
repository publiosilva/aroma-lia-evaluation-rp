using Xunit;

public class TestSmell014 {
   [Fact]
   public void TestEDI_856Idoc() {
      string[] m = new string[2];
      try {
          m = EDI.ProcessFile("edi/sampledata/ACME_IDOC_SHIPMNT02out.txt", "", "", "", false, false, 0, 0, "");
          if (m[0].Equals("0")) {
              System.Console.WriteLine("sample 856idoc...  pass");
          } else {
              System.Console.WriteLine("sample 850idoc...  fail");
              System.Console.WriteLine("m[1] message: " + m[1]);
          }
      } catch (System.Exception e) {
          System.Console.WriteLine("BS Exception: " + e.Message);
      }
      Assert.Equal("0", m[0]);
   }
}