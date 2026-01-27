import { expect } from '@jest/globals';

describe('EmptyInvalidWSDL', () => {
    it("test_smell_124", () => {
        delete (global as any).e;
        const e = expect(() => testutils.clientFromWsdl(b"")).toThrow(xml.sax.SAXParseException);
        try {
            expect(e.message).toBe("no element found");
        } finally {
            // Test implementation needed
        }
    });
});