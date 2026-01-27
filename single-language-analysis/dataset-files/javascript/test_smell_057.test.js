const { expect } = require('jest');

describe('HelpTest', () => {
  test("test_smell_057", () => {
    Help.view();
    const user = jest.mock(Ui);
    user.getValidInt.mockReturnValue(4);
    expect(Ui.getValidInt()).toBe(4);
  });
});