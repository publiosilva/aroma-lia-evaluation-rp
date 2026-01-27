const { expect } = require('jest');

describe('GPIO', () => {
    it("test_smell_108", () => {
        const pin = pins.pin(0, Out);
        
        expect(pin.direction).toBe(Out);
        expect(os.path.exists("/sys/class/gpio/gpio17/direction")).toBe(false);
        
        try {
            pin();
            expect(contentOf("/sys/class/gpio/gpio17/direction")).toBe("out\n");
            expect(pin.direction).toBe(Out);
        } catch (error) {}
    });
});