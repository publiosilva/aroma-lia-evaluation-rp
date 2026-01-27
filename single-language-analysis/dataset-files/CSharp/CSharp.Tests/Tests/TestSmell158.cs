using Xunit;

public class TestSmell158
{
    [Fact]
    public void TestProgressUpdates()
    {
        using (var client = Connect(progress_demo))
        {
            var job = client.Submit("hello", api_name: "/predict");
            var statuses = new List<Status>();
            while (!job.Done())
            {
                statuses.Add(job.Status());
                System.Threading.Thread.Sleep(20);
            }
            Assert.True(statuses.Any(s => s.Code == Status.PROGRESS);
            Assert.True(statuses.Any(s => s.ProgressData != null);
            var allProgressData = statuses
                .Where(s => s.ProgressData != null)
                .SelectMany(s => s.ProgressData)
                .ToList();
            var count = 0;
            for (var i = 0; i < 20; i++)
            {
                var unit = new ProgressUnit(
                    index: i, length: 20, unit: "steps", progress: null, desc: null
                );
                count += allProgressData.Contains(unit) ? 1 : 0;
            }
            Assert.Equal(20, count);
        }
    }
}