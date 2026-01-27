using Xunit;

public class TestSmell003
{
    [Fact]
    public void TestPessimisticReadWithPessimisticRead()
    {
        string name = "pessimisticRead";

        long id = CreateUser(name);

        var em = factory.CreateEntityManager();
        var tx = em.GetTransaction();

        tx.Begin();
        var u1 = em.Find<User>(id, LockModeType.PESSIMISTIC_READ);
        Assert.NotNull(u1);

        var executor = new TransactionExecutor(factory);
        var t = executor.AsyncExe(s => 
        {
            var user = s.Find<User>(id, LockModeType.PESSIMISTIC_READ);
            string readName = user.GetName(); //just a read operation
        });

        System.Threading.Thread.Sleep(5000); // simulate a long processing here

        Assert.True(t.IsAlive()); //the external transaction is still waiting for the lock

        tx.Commit();

        //now that the lock is released, we can wait for the external transaction to finish

        t.Join();

        Assert.False(t.IsAlive());
        em.Close();
    }

    private long CreateUser(string name)
    {
        // Implementation of CreateUser method
        return 0; // Placeholder return value
    }
}