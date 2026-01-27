const { expect } = require('jest');

describe('GPIO', () => {
    it("test_smell_128", () => {
        let pin;
        try {
            pin = pins.pin(0, Out);
            pin.value = 1;

            gpioAdmin("export", 17, PullDown);
            expect(contentOf('/sys/class/gpio/gpio17/value')).toBe('0\n');
            expect(contentOf('/sys/class/gpio/gpio17/direction')).toBe('in\n');
        } finally {
            gpioAdmin("unexport", 17);
        }
    });
});