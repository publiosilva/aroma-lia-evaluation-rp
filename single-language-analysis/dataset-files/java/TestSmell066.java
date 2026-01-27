// Original URL: https://github.com/elaissoussi/exercices/blob/50ac9b6d9e89c094010a9ed637bbd3198f36a729/marsrover/MarsRoverTest.java#L38-L48

public class TestSmell066 {
	@Test
	@Ignore
	public void driveEstThanTurnLeft() {
		String expectedPath = new StringBuilder().append("    *")
				.append(LINE_SEPARATOR).append("    |").append(LINE_SEPARATOR)
				.append("    |").append(LINE_SEPARATOR).append("    |")
				.append(LINE_SEPARATOR).append("X---+").append(LINE_SEPARATOR)
				.toString();
		System.out.println(expectedPath);
		assertThat(new MarsRover("sssslssss").path(), equalTo(expectedPath));
	}
}
