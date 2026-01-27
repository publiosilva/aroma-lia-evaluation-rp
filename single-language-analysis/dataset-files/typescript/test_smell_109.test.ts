import { expect } from '@jest/globals';

describe('DatetimeArray', () => {
    it("test_smell_109", () => {
        const dti = pd.date_range("2016-01-01", { periods: 3 });

        let res = dti.astype("M8[s]");
        expect(res.dtype).toBe("M8[s]");

        const dta = dti._data;
        res = dta.astype("M8[s]");
        expect(res.dtype).toBe("M8[s]");
        expect(res).toBeInstanceOf(pd.core.arrays.DatetimeArray); // used to be ndarray
    });
});