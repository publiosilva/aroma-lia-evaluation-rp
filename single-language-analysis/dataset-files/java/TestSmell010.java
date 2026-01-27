// Original URL: https://github.com/rdlester/hermes/blob/156c7cdc5479c50e952cea0878728383c1d2eb73/hermesTest/core/BeingTest.java#L58-L67

public class TestSmell010 {
	@Test
	public void test_updateTime() {
		TestBeing being = new TestBeing();	
		being.updateTime();
		try {
			Thread.sleep(10);
		} catch (InterruptedException e) { assertTrue(false); }
		long elapsed = being.updateTime();
		assertEquals(elapsed, 1e7,1e6); // this COULD fail if the system is running slow
	}
}
