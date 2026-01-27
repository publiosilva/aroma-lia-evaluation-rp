import org.junit.Test;
import static org.junit.Assert.*;

public class TestSmell158 {

    @Test
    public void testProgressUpdates() {
        try (Client client = connect(progressDemo)) {
            Job job = client.submit("hello", "/predict");
            List<Status> statuses = new ArrayList<>();
            while (!job.done()) {
                statuses.add(job.status());
                Thread.sleep(20);
            }
            assertTrue(statuses.stream().anyMatch(s -> s.code == Status.PROGRESS));
            assertTrue(statuses.stream().anyMatch(s -> s.progressData != null));
            List<ProgressData> allProgressData = new ArrayList<>();
            for (Status s : statuses) {
                if (s.progressData != null) {
                    allProgressData.addAll(s.progressData);
                }
            }
            int count = 0;
            for (int i = 0; i < 20; i++) {
                ProgressUnit unit = new ProgressUnit(i, 20, "steps", null, null);
                count += allProgressData.contains(unit) ? 1 : 0;
            }
            assertEquals(20, count);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}