import pytest

class TestCuckooHashTest:
    def test_smell_022(self, map, load, expected_capacity):
        print("Capacity: ", map.capacity(), " HashFuncs: ", map.get_num_hash_funcs(), " Buckets: ", map.get_num_buckets(), " Load: ", load)
        time = time.time()
        keys = []
        for i in range(int(map.capacity() * load)):
            keys.append(LongKey(random.randint(0, 2**63 - 1)))

        for i in range(len(keys)):
            key = keys[i]
            v = str(key.x)
            map.put(key, v)
            assert map.contains_key(key)
            assert v == map.get(key)

        for i in range(len(keys)):
            key = keys[i]
            v = str(key.x)
            assert v == map.get(key)

        assert expected_capacity == map.capacity()
        duration = time.time() - time
        print(duration, " ms")