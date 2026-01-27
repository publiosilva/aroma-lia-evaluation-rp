import { expect } from '@jest/globals';

class Sound {
    private octave: number = 5;

    getOctave(): number {
        return this.octave;
    }

    decOctave(): void {
        if (this.octave > 0) {
            this.octave--;
        }
    }
}

describe('SoundTest', () => {
    it("test_smell_012", () => {
        const sound = new Sound();
        expect(sound.getOctave()).toBe(5);

        for (let i = 0; i < 6; i++) {
            sound.decOctave();
        }
        console.log(sound.getOctave());
        expect(sound.getOctave()).toBe(0);
    });
});