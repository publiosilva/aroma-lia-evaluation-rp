// Original URL: https://github.com/noel-austin/CSU33012-Calculator/blob/9dee51c9af4d9ac7f8a161acb5baeb2ff1dd6691/MainTest.java#L32-L46

public class TestSmell007 {
	@Test
	public void testSubtraction() {
		String result = Main.toDoTheOperation(Main.recognize("10-10-10-10"));
		assertEquals("-20.0", result);
		result = Main.toDoTheOperation(Main.recognize("0-0"));
		assertEquals("0.0", result);
		result = Main.toDoTheOperation(Main.recognize("10-10-10-20"));
		assertEquals("-30.0", result);
		result = Main.toDoTheOperation(Main.recognize("1-1"));
		assertEquals("0.0", result);
		result = Main.toDoTheOperation(Main.recognize("10-10-10-10-10-10-10-10-10-10-10-10"));
		assertEquals("-100.0", result);
		result = Main.toDoTheOperation(Main.recognize("0-25-25-25"));
		assertEquals("-75.0", result);
	}
}
