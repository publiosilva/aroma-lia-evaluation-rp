// Original URL: https://github.com/Rangel888/Decimal-Binary-Hex-Converter/blob/6332568433580c1130a97ea1139d5c07d15a1f47/MTest.java#L28-L65

public class TestSmell028 {
	@Test
	void toBinaryTest() {
		var t = new M();
		
		//Decimal to binary
		t.toBinary("57", 1);
		String screen2 = M.screen2.getText();
		assertEquals("111001", screen2);
		
		t.toBinary("19991", 1);
		screen2 = M.screen2.getText();
		assertEquals("100111000010111",screen2);
		
		t.toBinary("15",1);
		screen2 = M.screen2.getText();
		assertEquals("1111",screen2);
		
		t.toBinary("100", 1);
		screen2 = M.screen2.getText();
		assertEquals("1100100",screen2);
		
		//HexaDecimal to binary
		t.toBinary("F", 3);
		screen2 = M.screen2.getText();
		assertEquals("1111",screen2);
		
		t.toBinary("106F", 3);
		screen2 = M.screen2.getText();
		assertEquals("1000001101111",screen2);
		
		t.toBinary("FF1", 3);
		screen2 = M.screen2.getText();
		assertEquals("111111110001",screen2);
		
		t.toBinary("111", 3);
		screen2 = M.screen2.getText();
		assertEquals("100010001",screen2);	
	}
}
