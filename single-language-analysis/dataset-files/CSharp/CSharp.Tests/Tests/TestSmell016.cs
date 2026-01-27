using Xunit;

public class TestSmell016
{
    private bool stop;

    [Fact]
    public void StopThread()
    {
        Thread t = new Thread(new ThreadStart(() =>
        {
            int i = 0;
            while (!stop)
            {
                i++;
                log.Info($"loop thread {i}");
                try
                {
                    Thread.Sleep(700);
                }
                catch (ThreadInterruptedException e)
                {
                    System.Console.WriteLine(e.StackTrace);
                }
            }
            log.Info($"stopThread[Thread:{Thread.CurrentThread.Name}]: count i is {i}");
        }));
        t.Start();

        Thread.Sleep(7000);
        stop = true;
        log.Info($"stopThread[Thread:{t.Name}]: stopped!");
    }
}