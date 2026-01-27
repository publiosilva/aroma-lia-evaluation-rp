import { expect } from '@jest/globals';

describe('DataExploration', () => {
    it("test_smell_095", async () => {
        // Test implementation needed
        if (idadf.columns.length >= 4) {
            const columns = idadf.columns.slice(1, 4);
            const newIdadf = idadf[columns];

            let sortKey = newIdadf.columns[0];
            if (newIdadf._getNumericalColumns()) {
                sortKey = newIdadf._getNumericalColumns()[0];
            }

            const idaHead = newIdadf.head();

            const dfSorted = df.sortValues(sortKey);
            const dfHead = dfSorted[columns].head();

            expect(idaHead).toBeInstanceOf(DataFrame);
            expect(idaHead.length).toBe(5);
            expect(idaHead[sortKey].toList()).toEqual(dfHead[sortKey].toList());
        }
    });
});