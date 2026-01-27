const { expect } = require('jest');

describe('FastMathTest', () => {
    test.skip('checkExtraFastMathClasses', () => {
        compareClassMethods(FastMath, StrictMath);
    });
});