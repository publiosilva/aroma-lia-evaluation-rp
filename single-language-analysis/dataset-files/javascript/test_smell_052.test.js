const { expect } = require('jest');

describe('MarsRoverTest', () => {
    it.skip('pathOverlapsAreMarkedWithRightCursor', () => {
        const marsRover = new MarsRover("ssssssrsss").turnRight()
            .moveForward().moveForward().moveForward().turnRight()
            .moveForward().moveForward().moveForward().moveForward();

        const expectedPath = "   *   \nX--+--+\n   |  |\n   |  |\n   +--+\n";

        expect(marsRover.path()).toBe(expectedPath);
    });
});