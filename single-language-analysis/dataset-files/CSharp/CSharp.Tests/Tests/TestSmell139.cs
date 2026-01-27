using Xunit;

public class TestSmell139
{
    [Fact]
    public void TestPluginLoadingAndUsage()
    {
        var Scheduler = new ThreadSafeScheduler();
        var Results = new List<string>();
        
        void Plugin(string data)
        {
            Results.Add(data);
        }
        
        Scheduler.LoadPlugin("p1", Plugin);
        
        void Job() 
        { 
            Scheduler.Plugins["p1"]("ok"); 
        }
        
        Scheduler.Schedule("jobp", Job, cronExpr: 1);
        Scheduler.ScheduleOneOff("onep", Job, runAt: DateTime.Now.AddSeconds(1));
        System.Threading.Thread.Sleep(1100);
        Scheduler.RunPending();
        System.Threading.Thread.Sleep(100);
        
        Assert.Equal(2, Results.Count(x => x == "ok"));
    }
}