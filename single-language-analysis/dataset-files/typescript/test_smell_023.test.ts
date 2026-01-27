import { expect } from '@jest/globals';

class Sound {
    private octave: number = 5;

    getOctave(): number {
        return this.octave;
    }

    incOctave(): void {
        this.octave++;
    }

    resetOctave(): void {
        this.octave = 5;
    }
}

describe('SoundTest', () => {
    it("test_smell_023", () => {
        const sound = new Sound();
        expect(sound.getOctave()).toBe(5);

        sound.incOctave();
        sound.resetOctave();
        expect(sound.getOctave()).toBe(5);
    });
});