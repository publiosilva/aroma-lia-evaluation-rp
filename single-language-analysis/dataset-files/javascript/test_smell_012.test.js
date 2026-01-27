const { expect } = require('jest');

describe('SoundTest', () => {
    test("test_smell_012", () => {
        const sound = new Sound();
        expect(sound.getOctave()).toBe(5);

        for (let i = 0; i < 6; i++) {
            sound.decOctave();
        }
        console.log(sound.getOctave());
        expect(sound.getOctave()).toBe(0);
    });
});