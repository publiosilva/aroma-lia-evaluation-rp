const { expect } = require('jest');

describe('GPUStat', () => {
    it("test_smell_086", () => {
        const g = gpustat.newQuery()[1]; // includes N/A
        console.log("(keys) : %s", JSON.stringify(Object.keys(g)));
        console.log(g);

        expect(g.name).toBe(g.entry.name);
        expect(g.uuid).toBe(g.uuid);

        try {
            g['unknown_key'];
        } catch (e) {
            expect(e).toBeInstanceOf(KeyError);
        }

        console.log("uuid : %s", g.uuid);
        console.log("name : %s", g.name);
        console.log("memory : used %d total %d avail %d", g.memoryUsed, g.memoryTotal, g.memoryAvailable);
        console.log("temperature : %d", g.temperature);
        console.log("utilization : %s", g.utilization);
        console.log("utilization_enc : %s", g.utilizationEnc);
        console.log("utilization_dec : %s", g.utilizationDec);
    });
});