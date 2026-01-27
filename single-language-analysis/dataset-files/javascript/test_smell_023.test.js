const { expect } = require('jest');

describe('SoundTest', () => {
    test("test_smell_023", () => {
        const sound = new Sound();
        expect(sound.getOctave()).toBe(5);

        sound.incOctave();
        sound.resetOctave();
        expect(sound.getOctave()).toBe(5);
    });
});