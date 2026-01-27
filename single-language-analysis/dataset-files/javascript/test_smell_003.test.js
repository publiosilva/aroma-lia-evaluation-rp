const { expect } = require('jest');

describe('UserTest', () => {
    it("test_smell_003", async () => {
        const name = "pessimisticRead";

        const id = createUser(name);

        const em = factory.createEntityManager();
        const tx = em.getTransaction();

        tx.begin();
        const u1 = em.find(User.class, id, LockModeType.PESSIMISTIC_READ);
        expect(u1).toBeTruthy();

        const executor = new TransactionExecutor(factory);
        const t = executor.asyncExe(s => {
            const user = s.find(User.class, id, LockModeType.PESSIMISTIC_READ);
            const readName = user.getName(); //just a read operation
        });

        await new Promise(resolve => setTimeout(resolve, 5000)); // simulate a long processing here

        expect(t.isAlive()).toBe(true); //the external transaction is still waiting for the lock

        tx.commit();

        //now that the lock is released, we can wait for the external transaction to finish

        await new Promise(resolve => t.join(resolve));

        expect(t.isAlive()).toBe(false);
        em.close();
    });
});