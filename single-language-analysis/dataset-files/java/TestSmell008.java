// Original URL: https://github.com/henrytxz/Algo/blob/f0b186aa128ebd01835013f432b793593c4a0e6d/slowTests/not_quick/ArrayInversionTest.java#L52-L80

public class TestSmell008 {
    @Ignore //coz it's not quick todo: to review
    @Test
    public void testSortAndCount() throws Exception {
        File file = new File("resources/IntegerArray.txt");
        try {
            List<Integer> list = MyArrayUtil.ListIntegerFromFile(file, 93000);  //todo: understand what's going on here

            Integer[] A = MyArrayUtil.ListIntegersToIntegerArray(list);

            Pair<Integer[],Integer> D_total = ArrayInversion.SortAndCount(A, A.length, 0, A.length - 1);

            Integer[] D = D_total.getLeft();

            MyArrayUtil.checkArrayIntegerSorted(D);

            int expectedInversions = ArrayInversion.bruteForceCount(A);
            System.out.println("-------------------------------------------");
            System.out.println("ArrayInversionTest.testSortAndCount() expect "+expectedInversions+" inversions");
            System.out.println("-------------------------------------------");
            Assert.assertEquals(expectedInversions, (int) D_total.getRight());

        } catch (FileNotFoundException e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
            Assert.fail();
        } catch (IOException e) {
            e.printStackTrace();
            Assert.fail();
        }
    }
}
