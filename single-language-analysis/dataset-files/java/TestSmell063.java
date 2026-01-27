// Original URL: https://github.com/joejensen8/Orange/blob/dac8bf7f4ed4120504e5652ddc0f79b7e1721e51/OpadTest.java#L99-L104

public class TestSmell063 {
    @Test
    public void testHashCode() throws Exception
    {
        Opad myOpad = new Opad(new SerialNumber(new BigInteger("4")), null);
        assertEquals(4, myOpad.hashCode());
    }
}
