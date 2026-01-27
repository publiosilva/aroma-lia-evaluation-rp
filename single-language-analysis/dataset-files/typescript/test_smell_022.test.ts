import { expect } from '@jest/globals';

describe('CuckooHashTest', () => {
  it("test_smell_022", () => {
    console.log("Capacity: " + map.capacity() + " HashFuncs: " + map.getNumHashFuncs() + " Buckets: " + map.getNumBuckets() + " Load: " + load);
    const time: number = Date.now();
    const keys: LongKey[] = [];
    for (let i = 0; i < map.capacity() * load; ++i) {
      keys.push(new LongKey(random.nextLong()));
    }

    for (let i = 0; i < keys.length; ++i) {
      const key: LongKey = keys[i];
      const v: string = Long.toString(key.x);
      map.put(key, v);
      expect(map.containsKey(key)).toBe(true);
      expect(map.get(key)).toBe(v);
    }

    for (let i = 0; i < keys.length; ++i) {
      const key: LongKey = keys[i];
      const v: string = Long.toString(key.x);
      expect(map.get(key)).toBe(v);
    }

    expect(map.capacity()).toBe(expectedCapacity);
    const duration: number = Date.now() - time;
    console.log(duration + " ms");
  });
});