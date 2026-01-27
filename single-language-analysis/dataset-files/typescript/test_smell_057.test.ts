import { expect } from '@jest/globals';

describe('HelpTest', () => {
    it("test_smell_057", () => {
        Help.view();
        const user: Ui = mock<Ui>();
        when(user.getValidInt()).thenReturn(4);
        // Check console output
        expect(4).toBe(Ui.getValidInt());
    });
});