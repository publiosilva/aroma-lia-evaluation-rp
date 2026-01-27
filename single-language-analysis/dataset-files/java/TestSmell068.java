// Original URL: https://github.com/AvinRai/CPUMarketplace/blob/c115187244db4da5c6748535ee749930ea35c98d/src/QueueTest.java#L108-L127

public class TestSmell068 {
    @Test
    void testEqualsObject() {
        setUp();
        assertTrue(q1.equals(q1));
        assertFalse(q1.equals(new String("A B C D E F G H I J K L")));
        for(int i = 0; i < 9; i++) {
            q1.dequeue();
        }
        System.out.println(q1);
        Queue<String> test = new Queue<>();
        test.enqueue(new String("J"));
        test.enqueue(new String("K"));
        test.enqueue(new String("L"));
        assertTrue(q1.equals(test));
        test.dequeue();
        assertFalse(q1.equals(test));
        Queue<Double> test2 = new Queue<>(new Double[]{1.1, 2.2, 3.2, 4.4});
        assertFalse(test2.equals(q3));
        assertFalse(test2.equals(test));
    }
}
