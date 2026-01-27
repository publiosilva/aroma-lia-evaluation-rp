import pytest

class TestUserTest:
    def test_smell_003(self):
        name = "pessimisticRead"

        id = self.create_user(name)

        em = self.factory.create_entity_manager()
        tx = em.get_transaction()

        tx.begin()
        u1 = em.find(User, id, LockModeType.PESSIMISTIC_READ)
        assert u1 is not None

        executor = TransactionExecutor(self.factory)
        t = executor.async_exe(lambda s: self.async_operation(s, id))

        time.sleep(5)  # simulate a long processing here

        assert t.is_alive()  # the external transaction is still waiting for the lock

        tx.commit()

        t.join()

        assert not t.is_alive()
        em.close()

    def async_operation(self, s, id):
        user = s.find(User, id, LockModeType.PESSIMISTIC_READ)
        read_name = user.get_name()  # just a read operation