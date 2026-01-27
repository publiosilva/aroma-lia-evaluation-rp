const { expect } = require('jest');

describe('SoundTest', () => {
    test("test_smell_009", () => {
        const sound = new Sound();
        sound.setNote('A');
        expect(sound.getNote()).toBe('A');

        sound.silence();
        expect(sound.getNote()).toBe('R');
    });
});