// Original URL: https://github.com/emmai89/Assignment/blob/2ec0af36a6cde4db003a09dbf18ba1ffcf1b1ffa/UnitTest.java#L19-L37

public class TestSmell017 {
   @Test
   public void testLinkedList1()
   {
      int ii;
      for(ii = 0; ii < 20; ii++)
      {
         list.insertLast(ii);
      }
      assertEquals(list.getCount(), 20);

      ii = 0;
      while(!list.isEmpty())
      {
         int test = list.removeFirst();
         assertEquals(test, ii);
         ii++;
      }
      assertEquals(list.getCount(), 0);
   }
}
