import { expect } from '@jest/globals';

describe('MarsRoverTest', () => {
    it.skip('driveEstThanTurnLeft', () => {
        const expectedPath: string = '    *\n' +
            '    |\n' +
            '    |\n' +
            '    |\n' +
            'X---+\n';
        console.log(expectedPath);
        expect(new MarsRover("sssslssss").path()).toBe(expectedPath);
    });
});