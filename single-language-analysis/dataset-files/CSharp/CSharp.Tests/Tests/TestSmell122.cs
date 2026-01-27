using Xunit;

public class TestSmell122
{
    [Fact]
    public void TestThreadSafety()
    {
        var errors = new List<string>();

        void Cb()
        {
            System.Threading.Thread.Sleep(1e-3);
            var r = this.Module.T(() => 123);
            Assert.Equal(123, r);
            return 42;
        }

        void Runner(string name)
        {
            try
            {
                for (int j = 0; j < 50; j++)
                {
                    var r = this.Module.T(Cb);
                    Assert.Equal(42, r);
                    CheckFunction(name);
                }
            }
            catch (Exception)
            {
                errors.Add(Exception.ToString());
            }
        }

        var threads = new List<System.Threading.Thread>();
        foreach (var arg in new[] { "t", "t2" })
        {
            for (int n = 0; n < 20; n++)
            {
                threads.Add(new System.Threading.Thread(() => Runner(arg)));
            }
        }

        foreach (var t in threads)
        {
            t.Start();
        }

        foreach (var t in threads)
        {
            t.Join();
        }

        var errorMessages = string.Join("\n\n", errors);
        if (!string.IsNullOrEmpty(errorMessages))
        {
            throw new Xunit.Sdk.AssertActualExpectedException(errorMessages, null, null);
        }
    }
}