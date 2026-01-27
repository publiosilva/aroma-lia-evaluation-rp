const { expect } = require('jest');

describe('MarsRoverTest', () => {
    it.skip("test_smell_066", () => {
        const expectedPath = '    *\n' +
                             '    |\n' +
                             '    |\n' +
                             '    |\n' +
                             'X---+\n';
        console.log(expectedPath);
        expect(new MarsRover("sssslssss").path()).toBe(expectedPath);
    });
});