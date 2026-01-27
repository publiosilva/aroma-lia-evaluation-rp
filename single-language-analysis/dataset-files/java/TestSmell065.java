// Original URL: https://github.com/Ben-Steele/Tree-Data-Structure/blob/64414632285e77c62a4d31a7ccaa719751a393ba/TreeTest.java#L178-L190

public class TestSmell065 {
	@Test
	public void test_remove9() {
		System.out.println("Test first left of right child");
		Tree<Integer> s = new Tree<Integer>();
		s.add(4);
		s.add(2);
		s.add(3);
		s.add(1);
		s.add(6);
		s.add(7);
		s.remove(4);
		assertTrue(s.checkContains(2) == true && s.checkContains(4) == false && s.checkContains(3) == true && s.checkContains(1) == true && s.checkContains(6) == true && s.checkContains(7) == true);
	}
}
