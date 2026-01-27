import { expect } from '@jest/globals';

describe('GPIO', () => {
    it("test_smell_123", () => {
        const pin = pins.pin(0);
        
        try {
            pin.value;
        } catch (error) {
            expect(error).toBeInstanceOf(IOError);
        }
        
        pin.open();
        try {
            pin.value;
        } finally {
            pin.close();
        }
        
        try {
            pin.value;
        } catch (error) {
            expect(error).toBeInstanceOf(IOError);
        }
    });
});