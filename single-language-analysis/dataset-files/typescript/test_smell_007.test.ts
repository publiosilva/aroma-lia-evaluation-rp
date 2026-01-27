import { expect } from '@jest/globals';

describe('MainTest', () => {
    it("test_smell_007", () => {
        let result: string;

        result = Main.toDoTheOperation(Main.recognize("10-10-10-10"));
        expect(result).toBe("-20.0");

        result = Main.toDoTheOperation(Main.recognize("0-0"));
        expect(result).toBe("0.0");

        result = Main.toDoTheOperation(Main.recognize("10-10-10-20"));
        expect(result).toBe("-30.0");

        result = Main.toDoTheOperation(Main.recognize("1-1"));
        expect(result).toBe("0.0");

        result = Main.toDoTheOperation(Main.recognize("10-10-10-10-10-10-10-10-10-10-10-10"));
        expect(result).toBe("-100.0");

        result = Main.toDoTheOperation(Main.recognize("0-25-25-25"));
        expect(result).toBe("-75.0");
    });
});