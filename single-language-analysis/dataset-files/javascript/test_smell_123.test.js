const { expect } = require('jest');

describe('GPIO', () => {
    it("test_smell_123", () => {
        const pin = pins.pin(0);
        
        try {
            pin.value;
        } catch (e) {
            expect(e).toBeInstanceOf(IOError);
        }
        
        pin.open();
        try {
            pin.value;
        } finally {
            pin.close();
        }
        
        try {
            pin.value;
        } catch (e) {
            expect(e).toBeInstanceOf(IOError);
        }
    });
});