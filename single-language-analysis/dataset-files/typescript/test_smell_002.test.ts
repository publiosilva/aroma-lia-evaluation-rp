import { expect } from '@jest/globals';
import { Git } from './Git'; // Adjust the import path as necessary
import { promises as fs } from 'fs';

describe('GitTest', () => {
    it("test_smell_002", async () => {
        // Call init method
        await Git.initialize();

        // Checks if index and objects were created
        let indexExists: boolean;
        try {
            await fs.stat('index');
            indexExists = true;
        } catch {
            indexExists = false;
        }

        let objectsExists: boolean;
        try {
            const stats = await fs.stat('objects');
            objectsExists = stats.isDirectory();
        } catch {
            objectsExists = false;
        }

        expect(indexExists).toBe(true);
        expect(objectsExists).toBe(true);
    });
});