import { expect } from '@jest/globals';

describe('UnitTest', () => {
   test("test_smell_001", () => {
      const locations = FileIO.readLocationFile("location.csv");

      expect(locations.peekFirst().getName()).toBe("Perth");

      const map = FileIO.readDistanceFile("distances.csv", locations);

      expect(locations.getCount()).toBe(14);
      expect(map.getNodeCount()).toBe(11);
      expect(map.getEdgeCount()).toBe(62);

      const temp: number = map.getEdges().peekFirst().findWeight("walk").getLength();
      expect(temp).toBeCloseTo(13.1, 0.0001);

      const temp1: number = map.getEdges().peekFirst().findWeight("car").getPkTime();
      expect(temp1).toBe(24);
   });
});