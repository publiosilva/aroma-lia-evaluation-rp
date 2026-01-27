const { expect } = require('jest');

describe('SkinCleanupTest', () => {
  test.skip('testTreeTableRowFixedCellSizeListener', () => {
    const tableView = createPersonTreeTable(false);
    showControl(tableView, true);
    const tableRow = getCell(tableView, 1);
    const rowSkin = tableRow.getSkin();
    expect(unregisterChangeListeners(rowSkin, tableView.fixedCellSizeProperty())).toBeNull();
  });
});