const { expect } = require('jest');

describe('DatetimeArray', () => {
    const dtypes = ["datetime64[ns]", "datetime64[ns, UTC]"];
    const others = ["datetime64[ns]", "datetime64[ns, UTC]", "datetime64[ns, CET]"];

    it('should handle astype copies for all dtype and other combinations', () => {
        dtypes.forEach(dtype => {
            others.forEach(other => {
                const ser = pd.Series([1, 2], { dtype: dtype });
                const orig = ser.copy();

                let err = false;
                if ((dtype === "datetime64[ns]") !== (other === "datetime64[ns]")) {
                    err = true;
                }

                if (err) {
                    let msg;
                    if (dtype === "datetime64[ns]") {
                        msg = "Use obj.tz_localize instead or series.dt.tz_localize instead";
                    } else {
                        msg = "from timezone-aware dtype to timezone-naive dtype";
                    }
                    expect(() => ser.astype(other)).toThrow(TypeError);
                    expect(() => ser.astype(other)).toThrow(msg);
                } else {
                    const t = ser.astype(other);
                    t.fill(pd.NaT);
                    expect(ser).toEqual(orig);
                }
            });
        });
    });
});