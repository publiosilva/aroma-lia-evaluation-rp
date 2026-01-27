// Original URL: https://github.com/arcuri82/testing_security_development_enterprise_systems/blob/c80e35b4181111f0e56ae7243bd5762756af4f90/old/old_jpa_lock/UserTest.java#L296-L340

public class TestSmell003 {
    @Test
    public void testPessimisticReadWithPessimisticRead() throws Exception {

        String name = "pessimisticRead";

        long id = createUser(name);

        EntityManager em = factory.createEntityManager();
        EntityTransaction tx = em.getTransaction();

        tx.begin();
        User u1 = em.find(User.class, id, LockModeType.PESSIMISTIC_READ);
        assertNotNull(u1);

        TransactionExecutor executor = new TransactionExecutor(factory);
        Thread t = executor.asyncExe(s -> {
            User user = s.find(User.class, id, LockModeType.PESSIMISTIC_READ);
            String readName = user.getName(); //just a read operation
        });
        /*
            even if it just a read operation, because it tries to put a lock
            on an already locked entity, it will block.

            Again: if you read JEE documentation, this should not really happen,
            as you should be able to get a read lock if no one else is having
            a write one.

            However, PESSIMISTIC_READ does depend on the actual database.
            If the database does not support it, it would default to
            PESSIMISTIC_WRITE
         */

        Thread.sleep(5_000); // simulate a long processing here

        assertTrue(t.isAlive()); //the external transaction is still waiting for the lock

        tx.commit();

        //now that the lock is released, we can wait for the external transaction to finish

        t.join();

        assertFalse(t.isAlive());
        em.close();
    }
}
