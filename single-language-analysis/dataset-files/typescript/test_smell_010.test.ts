import { expect } from '@jest/globals';

describe('BeingTest', () => {
  test("test_smell_010", () => {
    const being = new TestBeing();	
    being.updateTime();
    try {
      // Simulate sleep
      const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
      sleep(10);
    } catch (e) { 
      expect(true).toBe(false); 
    }
    const elapsed = being.updateTime();
    expect(elapsed).toBeCloseTo(1e7, 1e6); // this COULD fail if the system is running slow
  });
});