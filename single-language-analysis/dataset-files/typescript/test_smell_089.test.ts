import { expect } from '@jest/globals';

describe('DatetimeArray', () => {
    it("test_smell_089", () => {
        const dti = pd.date_range("2016-01-01", { periods: 3, tz: "UTC" });

        const res = dti.astype("M8[s, US/Pacific]");
        expect(res.dtype).toBe("M8[s, US/Pacific]");

        const dta = dti._data;
        const res2 = dta.astype("M8[s, US/Pacific]");
        expect(res2.dtype).toBe("M8[s, US/Pacific]");

        const res3 = res.astype("M8[s, UTC]");
        expect(res3.dtype).toBe("M8[s, UTC]");
        expect(tm.shares_memory(res3, res)).toBe(false);

        const res4 = res.astype("M8[s, UTC]", { copy: false });
        expect(res3.dtype).toBe("M8[s, UTC]");
        expect(tm.shares_memory(res4, res)).toBe(true);
    });
});