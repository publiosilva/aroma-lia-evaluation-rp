// Original URL: https://github.com/blueseerERP/blueseer/blob/77d3e9cdd7f364ed556f982cbfa71eabf812c5bc/src/utilities/bsTest.java#L89-L103

public class TestSmell070 {
   @Test
   public void testEDI_850xml() {
      try {
          m = EDI.processFile("edi/sampledata/ACME_XML_order.xml","","","", false, false, 0, 0, "");
          if (m[0].equals("0")) {
              System.out.println("sample 850xml...   pass");
          } else {
              System.out.println("sample 850xml...   fail");
              System.out.println("m[1] message: " + m[1]);
          }
      } catch (Exception e) {
          System.out.println("BS Exception: " + e.getMessage() );
      }
      assertEquals("0",m[0]);
   }
}
