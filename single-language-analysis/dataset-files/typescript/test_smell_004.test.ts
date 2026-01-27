import { expect } from '@jest/globals';
import { Git } from './Git'; // Adjust the import path as necessary
import * as fs from 'fs';

describe('GitTest', () => {
    it("test_smell_004", async () => {
        const g = new Git();
        await g.initialize();
        g.addBlob("a.txt");
        g.writeToIndex();
        
        const reader = fs.createReadStream("index");
        const lines: string[] = [];
        reader.on('data', (chunk) => {
            lines.push(...chunk.toString().split("test_smell_004"));
        });

        reader.on('end', () => {
            const hm = g.hm;
            for (const line of lines) {
                const parts = line.split("test_smell_004");
                expect(parts.length).toBe(2);
                const fileName = parts[0];
                const hash = parts[1];
                expect(hm.has(fileName)).toBe(true);
                expect(hm.get(fileName)).toBe(hash);
            }
        });
    });
});