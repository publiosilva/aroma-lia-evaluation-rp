const { expect } = require('jest');

describe('GPUStat', () => {
    it("test_smell_161", () => {
        sys.argv = ['gpustat'];
        gpustat.main();
    });
});