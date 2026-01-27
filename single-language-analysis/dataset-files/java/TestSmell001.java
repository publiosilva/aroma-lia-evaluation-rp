// Original URL: https://github.com/emmai89/Assignment/blob/2ec0af36a6cde4db003a09dbf18ba1ffcf1b1ffa/UnitTest.java#L59-L78

public class TestSmell001 {
   @Test
   public void FileIOLocation()
   {
      locations = FileIO.readLocationFile("location.csv");

      assertEquals(locations.peekFirst().getName(), "Perth");

      map = FileIO.readDistanceFile("distances.csv", locations);

      assertEquals(locations.getCount(), 14);
      assertEquals(map.getNodeCount(), 11);
      assertEquals(map.getEdgeCount(), 62);

      double temp = map.getEdges().peekFirst().findWeight("walk").getLength();
      assertEquals(temp, 13.1, 0.0001);

      int temp1 = map.getEdges().peekFirst().findWeight("car").getPkTime();
      assertEquals(temp1, 24);

   }
}
