// Original URL: https://github.com/hhaslam11/Text-Fighter/blob/ae0fe3e4fba1e8ebb880a2ab0572069b21e8618f/src/com/hotmail/kalebmarc/textfighter/main/HelpTest.java#L14-L22

public class TestSmell057 {
	@Test
	//Test to ensure the Help.view() User input 4 outputs Health information
	public void testView() {
		Help.view();
		Ui user = mock(Ui.class);
		when(user.getValidInt()).thenReturn(4);
		//Check console output
		assertEquals(4,Ui.getValidInt());
	}
}
