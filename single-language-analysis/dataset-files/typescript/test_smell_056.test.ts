import { expect } from '@jest/globals';

describe('FastMathTest', () => {
    it.skip('checkExtraFastMathClasses', () => {
        compareClassMethods(FastMath, StrictMath);
    });
});