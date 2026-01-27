// Original URL: https://github.com/efleming91/AlternativeLanguage/blob/08766423dcfbf8530e0c5a89eafb2bdfa1db370f/CellTest.java#L75-L80

public class TestSmell064 {
    @Test
    public void testMean() {
        assertEquals("Mean of empty list should be 0.0", 0.0, Cell.calculateMean(new ArrayList<>()), 0.001);
        assertEquals("Mean of null should be 0.0", 0.0, Cell.calculateMean(null), 0.001);
        assertEquals("Mean of test numbers should be 2.0", 2.0, Cell.calculateMean(Arrays.asList(1f, 2f, 3f)), 0.001);
    }
}
