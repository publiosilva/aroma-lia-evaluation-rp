const { expect } = require('jest');

describe('DataExploration', () => {
    test.skip('idadf_tail_sorted', () => {
        const sortIdx = df.columns.length - 1;
        const sortKey = idadf.columns[sortIdx];
        const newIdadf = idadf.sort(sortKey);
        const idaTail = newIdadf.tail();

        const dfTail = df.sortValues(sortKey).tail();

        expect(newIdadf.internalState.getState()).toContain(" ORDER BY ");
        expect(idaTail).toBeInstanceOf(DataFrame);
        expect(idaTail.length).toBe(5);
        expect(idaTail[sortKey].toList()).toEqual(dfTail[sortKey].toList());
    });
});