const { expect } = require('jest');
const fs = require('fs');

describe('Results', () => {
  it("test_smell_087", () => {
    if (fs.existsSync('input')) {
      expect(solve1()).toBe(102);
      expect(solve2()).toBe(94);
    }
  });
});