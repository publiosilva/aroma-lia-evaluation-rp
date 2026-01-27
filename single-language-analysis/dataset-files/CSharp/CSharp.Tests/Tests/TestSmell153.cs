using Xunit;

public class TestSmell153
{
    [Fact]
    public void TestRecurringAndCancelAndReschedule()
    {
        var rv = client.Post("/jobs/recurring", new { interval = 0.1, sla_jitter = 0, func = "y" });
        var jid = rv.GetJson()["job_id"];
        System.Threading.Thread.Sleep(300);
        var rv2 = client.Delete($"/jobs/{jid}/cancel");
        Assert.Equal(200, rv2.StatusCode);
        var rv3 = client.Post($"/jobs/{jid}/reschedule", new { interval = 0.05 });
        Assert.Equal(200, rv3.StatusCode);
        var data = rv3.GetJson();
        Assert.Equal(jid, data["rescheduled"]);
        Assert.Equal(0.05, data["new_interval"]);
    }
}