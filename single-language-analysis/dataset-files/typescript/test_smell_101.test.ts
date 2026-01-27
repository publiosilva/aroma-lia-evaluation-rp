import { expect } from '@jest/globals';
import { Series } from 'pandas-js'; // Assuming a similar pandas library exists in TypeScript

describe('DatetimeArray', () => {
    const dtypes = ["datetime64[ns]", "datetime64[ns, UTC]"];
    const others = ["datetime64[ns]", "datetime64[ns, UTC]", "datetime64[ns, CET]"];

    it("test_smell_101", () => {
        dtypes.forEach(dtype => {
            others.forEach(other => {
                const ser = new Series([1, 2], { dtype });
                const orig = ser.copy();

                let err = false;
                if ((dtype === "datetime64[ns]") !== (other === "datetime64[ns]")) {
                    err = true;
                }

                if (err) {
                    let msg = "";
                    if (dtype === "datetime64[ns]") {
                        msg = "Use obj.tz_localize instead or series.dt.tz_localize instead";
                    } else {
                        msg = "from timezone-aware dtype to timezone-naive dtype";
                    }
                    expect(() => ser.astype(other)).toThrow(TypeError);
                } else {
                    const t = ser.astype(other);
                    t.fill(null); // Assuming this sets all values to NaT
                    expect(ser).toEqual(orig); // Assuming a similar assertion method exists
                }
            });
        });
    });
});