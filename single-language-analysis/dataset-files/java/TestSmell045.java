// Original URL: https://github.com/rdlester/hermes/blob/156c7cdc5479c50e952cea0878728383c1d2eb73/hermesTest/core/BeingTest.java#L93-L105

public class TestSmell045 {
	@Test
	public void test_processUpdate() {
		TestBeing being = new TestBeing();	
		being.setVelocity(makeVector(0.5f,0.0f,0.0f));
		being.updateTime();
		try {
			Thread.sleep(1000);
		} catch (InterruptedException e) { assertTrue(false); }
		being.processUpdate();
		assertEquals(being.getPosition().x, 0.5f, 1e-2);
		assertEquals(being.getPosition().y, 0.0f, 1e-2);
		assertEquals(being.getPosition().z, 0.0f, 1e-2);
	}
}
