using Xunit;

public class TestSmell157
{
    [Fact]
    public void TestPriorityOrdering()
    {
        var response1 = client.Post(
            "/ingest",
            new { ids = new[] { 1, 2, 3, 4, 5 }, priority = "MEDIUM" }
        );
        var ingestionId1 = response1.Content.ReadAsAsync<dynamic>().Result.ingestion_id;

        var response2 = client.Post(
            "/ingest",
            new { ids = new[] { 6, 7, 8, 9 }, priority = "HIGH" }
        );
        var ingestionId2 = response2.Content.ReadAsAsync<dynamic>().Result.ingestion_id;

        System.Threading.Thread.Sleep(6000);

        var status1 = client.Get($"/status/{ingestionId1}");
        var status2 = client.Get($"/status/{ingestionId2}");

        var completedBatches1 = status1.Content.ReadAsAsync<dynamic>().Result.batches
            .Count(batch => batch.status == BatchStatus.COMPLETED);
        var completedBatches2 = status2.Content.ReadAsAsync<dynamic>().Result.batches
            .Count(batch => batch.status == BatchStatus.COMPLETED);

        Assert.Equal(completedBatches2 >= completedBatches1, true);
    }
}