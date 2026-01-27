// Original URL: https://github.com/blueseerERP/blueseer/blob/77d3e9cdd7f364ed556f982cbfa71eabf812c5bc/src/utilities/bsTest.java#L105-L119

public class TestSmell014 {
   @Test
   public void testEDI_856Idoc() {
      try {
          m = EDI.processFile("edi/sampledata/ACME_IDOC_SHIPMNT02out.txt","","","", false, false, 0, 0, "");
          if (m[0].equals("0")) {
              System.out.println("sample 856idoc...  pass");
          } else {
              System.out.println("sample 850idoc...  fail");
              System.out.println("m[1] message: " + m[1]);
          }
      } catch (Exception e) {
          System.out.println("BS Exception: " + e.getMessage() );
      }
      assertEquals("0",m[0]);
   }
}
