const { expect } = require('jest');

describe('CuckooHashTest', () => {
  it("test_smell_022", () => {
    console.log("Capacity: " + map.capacity() + " HashFuncs: " + map.getNumHashFuncs() + " Buckets: " + map.getNumBuckets() + " Load: " + load);
    const time = Date.now();
    const keys = [];
    for (let i = 0; i < map.capacity() * load; ++i) {
      keys.push(new LongKey(random.nextLong()));
    }

    for (let i = 0; i < keys.length; ++i) {
      const key = keys[i];
      const v = String(key.x);
      map.put(key, v);
      expect(map.containsKey(key)).toBe(true);
      expect(map.get(key)).toBe(v);
    }

    for (let i = 0; i < keys.length; ++i) {
      const key = keys[i];
      const v = String(key.x);
      expect(map.get(key)).toBe(v);
    }

    expect(map.capacity()).toBe(expectedCapacity);
    const duration = Date.now() - time;
    console.log(duration + " ms");
  }); 
});
