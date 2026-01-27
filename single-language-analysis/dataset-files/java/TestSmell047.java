// Original URL: https://github.com/JennsiS/Data-Structures-Profiler/blob/6eb9016dd80c6c32502e67087f33d59a74e8e6d7/MainTest.java#L9-L18

public class TestSmell047 {
    @Test
    public void main() {
        try {
            new FileNotFoundException();
            fail("Exception not thrown");
        } catch (UnsupportedOperationException e) {
            assertEquals("Operation Not Supported", e.getMessage());
        }

    }
}
