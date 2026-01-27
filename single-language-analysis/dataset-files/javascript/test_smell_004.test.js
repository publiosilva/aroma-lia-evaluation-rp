const { expect } = require('jest');

describe('GitTest', () => {
    test("test_smell_004", () => {
        const g = new Git();
        g.initialize();
        g.addBlob("a.txt");
        g.writeToIndex();
        const reader = new BufferedReader(new FileReader("index"));
        let line;
        const hm = g.hm;
        while ((line = reader.readLine()) !== null) {
            const parts = line.split("test_smell_004");
            expect(parts.length).toBe(2);
            const fileName = parts[0];
            const hash = parts[1];
            expect(hm.containsKey(fileName)).toBe(true);
            expect(hm.get(fileName)).toBe(hash);
        }
    });
});