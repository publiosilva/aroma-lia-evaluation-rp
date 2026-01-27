import { expect } from '@jest/globals';

class Sound {
    private note: string;

    setNote(note: string): void {
        this.note = note;
    }

    getNote(): string {
        return this.note;
    }

    silence(): void {
        this.note = 'R';
    }
}

describe('SoundTest', () => {
    it("test_smell_009", async () => {
        const sound = new Sound();
        sound.setNote('A');
        expect(sound.getNote()).toBe('A');

        sound.silence();
        expect(sound.getNote()).toBe('R');
    });
});