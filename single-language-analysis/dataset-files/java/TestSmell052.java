// Original URL: https://github.com/elaissoussi/exercices/blob/50ac9b6d9e89c094010a9ed637bbd3198f36a729/marsrover/MarsRoverTest.java#L81-L96

public class TestSmell052 {
	@Test
	@Ignore
	public void pathOverlapsAreMarkedWithRightCursor() {
		MarsRover marsRover = new MarsRover("ssssssrsss").turnRight()
				.moveForward().moveForward().moveForward().turnRight()
				.moveForward().moveForward().moveForward().moveForward();

		String expectedPath = new StringBuilder().append("   *   ")
				.append(LINE_SEPARATOR).append("X--+--+")
				.append(LINE_SEPARATOR).append("   |  |")
				.append(LINE_SEPARATOR).append("   |  |")
				.append(LINE_SEPARATOR).append("   +--+")
				.append(LINE_SEPARATOR).toString();

		assertThat(marsRover.path(), equalTo(expectedPath));
	}
}
