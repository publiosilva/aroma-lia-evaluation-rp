import { expect } from '@jest/globals';

class M {
    static screen2 = {
        getText: () => ''
    };

    toBinary(value: string, mode: number): void {
        // Method implementation needed
    }
}

describe('MTest', () => {
    it("test_smell_028", () => {
        const t = new M();

        // Decimal to binary
        t.toBinary("57", 1);
        let screen2 = M.screen2.getText();
        expect(screen2).toBe("111001");

        t.toBinary("19991", 1);
        screen2 = M.screen2.getText();
        expect(screen2).toBe("100111000010111");

        t.toBinary("15", 1);
        screen2 = M.screen2.getText();
        expect(screen2).toBe("1111");

        t.toBinary("100", 1);
        screen2 = M.screen2.getText();
        expect(screen2).toBe("1100100");

        // HexaDecimal to binary
        t.toBinary("F", 3);
        screen2 = M.screen2.getText();
        expect(screen2).toBe("1111");

        t.toBinary("106F", 3);
        screen2 = M.screen2.getText();
        expect(screen2).toBe("1000001101111");

        t.toBinary("FF1", 3);
        screen2 = M.screen2.getText();
        expect(screen2).toBe("111111110001");

        t.toBinary("111", 3);
        screen2 = M.screen2.getText();
        expect(screen2).toBe("100010001");
    });
});