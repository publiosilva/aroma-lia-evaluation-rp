// Original URL: https://github.com/henrytxz/Algo/blob/f0b186aa128ebd01835013f432b793593c4a0e6d/slowTests/not_quick/ArrayInversionTest.java#L82-L108

public class TestSmell024 {
    @Ignore //coz it's not quick todo: to review
    @Test
    public void testBigIntegerSortAndCount() throws Exception {
        File file = new File("resources/IntegerArray.txt");
        try {
            List<Integer> list = MyArrayUtil.ListIntegerFromFile(file);

            Integer[] A = MyArrayUtil.ListIntegersToIntegerArray(list);

            Pair<Integer[],Integer> D_total = ArrayInversion.SortAndCount(A, A.length, 0, A.length-1);

            Integer[] D = D_total.getLeft();

            MyArrayUtil.checkArrayIntegerSorted(D);

            BigInteger expectedInversions = ArrayInversion.BigInteger_bruteForceCount(A);
            System.out.println("expect "+expectedInversions+" inversions");
//            Assert.assertEquals(expectedInversions, (int) D_total.getRight());

        } catch (FileNotFoundException e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
            Assert.fail();
        } catch (IOException e) {
            e.printStackTrace();
            Assert.fail();
        }
    }
}
