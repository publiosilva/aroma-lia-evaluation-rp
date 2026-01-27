const { expect } = require('jest');

describe('PR655', () => {
    it.skip("test_smell_152", () => {
        const pr655 = hardware.findPhotometer({ device: 'PR655' });
        if (pr655 === null) {
            console.warn('no device found');
        } else {
            console.log(('type:', pr655.type));
            console.log(('SN:', pr655.getDeviceSN()));
            if (pr655.type === 'D') {
                // jest.skip();
                return;
            }
            pr655.measure();
            console.log(('lum', pr655.lastLum));
            console.log(('uv', pr655.lastUV));
            console.log(('xy', pr655.lastXY));
            console.log(('tristim', pr655.lastTristim));
            const [nm, spec] = pr655.getLastSpectrum();
            console.log(('nm', nm));
            console.log(('spec', spec));
            console.log(('temperature', pr655.lastColorTemp));
        }

        console.log('DONE');
    });
});