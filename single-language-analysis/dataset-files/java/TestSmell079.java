// Original URL: https://github.com/adamldavis/hellojava8/blob/65cc59228b43a1e722f8f662499b7c55979d7b44/TailTest.java#L55-L58

public class TestSmell079 {
	@Test
	public void should_not_throw_stack_overflow() {
		Tail.streamFactorial(56789);
	}
}
