const { expect } = require('jest');

describe('DatetimeArray', () => {
    it("test_smell_089", () => {
        const dti = pd.date_range("2016-01-01", { periods: 3, tz: "UTC" });

        const res = dti.astype("M8[s, US/Pacific]");
        expect(res.dtype).toBe("M8[s, US/Pacific]");

        const dta = dti._data;
        const res_dta = dta.astype("M8[s, US/Pacific]");
        expect(res_dta.dtype).toBe("M8[s, US/Pacific]");

        const res2 = res.astype("M8[s, UTC]");
        expect(res2.dtype).toBe("M8[s, UTC]");
        expect(tm.shares_memory(res2, res)).toBe(false);

        const res3 = res.astype("M8[s, UTC]", { copy: false });
        expect(res2.dtype).toBe("M8[s, UTC]");
        expect(tm.shares_memory(res3, res)).toBe(true);
    });
});