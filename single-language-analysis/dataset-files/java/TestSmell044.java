// Original URL: https://github.com/henrytxz/Algo/blob/f0b186aa128ebd01835013f432b793593c4a0e6d/slowTests/not_quick/ArrayInversionTest.java#L22-L50

public class TestSmell044 {
    @Ignore //coz it's not quick todo: to review
    @Test
    public void debugSortAndCount() throws Exception {
        File file = new File("resources/IntegerArray.txt");
        try {
//            System.out.println(Integer.MAX_VALUE);
            List<Integer> list = MyArrayUtil.ListIntegerFromFile(file,94650);      //94680
            System.out.println("list size:"+list.size());

            Integer[] A = MyArrayUtil.ListIntegersToIntegerArray(list);

            Pair<Integer[],Integer> D_total = ArrayInversion.SortAndCount(A, A.length, 0, A.length-1);

            Integer[] D = D_total.getLeft();

            MyArrayUtil.checkArrayIntegerSorted(D);
            System.out.println("expect "+D_total.getRight()+" inversions");
            int expectedInversions = ArrayInversion.bruteForceCount(A);
//            System.out.println("expect "+expectedInversions+" inversions");
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
