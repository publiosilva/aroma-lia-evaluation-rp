// Original URL: https://github.com/nguyenmv2/ChessAI/blob/61c7d27b9697f9e84af1cde6aa063b73a7c154d1/src/chess/hash/CuckooHashTest.java#L125-L150

public class TestSmell022 {
	@Test
	public void basicTest(CuckooHashLong<LongKey,String> map, double load, int expectedCapacity) {
		System.out.println("Capacity: " + map.capacity() + " HashFuncs: " + map.getNumHashFuncs() + " Buckets: " + map.getNumBuckets() + " Load: " + load);
		long time = System.currentTimeMillis();
		ArrayList<LongKey> keys = new ArrayList<LongKey>();
		for (int i = 0; i < map.capacity() * load; ++i) {
			keys.add(new LongKey(random.nextLong()));
		}
		
		for (int i = 0; i < keys.size(); ++i) {
			LongKey key = keys.get(i);
			String v = Long.toString(key.x);
			map.put(key, v);
			assertTrue(map.containsKey(key));
			assertEquals(v, map.get(key));
		}
		
		for (int i = 0; i < keys.size(); ++i) {
			LongKey key = keys.get(i);
			String v = Long.toString(key.x);
			assertEquals(v, map.get(key));
		}
		
		assertEquals(expectedCapacity, map.capacity());
		long duration = System.currentTimeMillis() - time;
		System.out.println(duration + " ms");
	}
}
