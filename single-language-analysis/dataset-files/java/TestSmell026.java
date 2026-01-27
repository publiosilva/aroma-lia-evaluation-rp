// Original URL: https://github.com/joejensen8/Orange/blob/dac8bf7f4ed4120504e5652ddc0f79b7e1721e51/OpadTest.java#L63-L86

public class TestSmell026 {
    @Test
    public void testGetDescription() throws Exception
    {
        ArrayList<String> myArr = new ArrayList<>();
        Set<String> mySet = new HashSet<>(myArr);
        Opad myOpad = new Opad(new SerialNumber(new BigInteger("4")), Optional.of(mySet));

        // Empty
        assertEquals(Optional.of(mySet), myOpad.getDescription());

        // One element
        myArr.add("OPAD");
        mySet = new HashSet<>(myArr);
        myOpad = new Opad(new SerialNumber(new BigInteger("4")), Optional.of(mySet));
        assertEquals(Optional.of(mySet), myOpad.getDescription());

        // Multiple Elements
        myArr.add("is");
        myArr.add("the");
        myArr.add("Product");
        mySet = new HashSet<>(myArr);
        myOpad = new Opad(new SerialNumber(new BigInteger("4")), Optional.of(mySet));
        assertEquals(Optional.of(mySet), myOpad.getDescription());
    }
}
