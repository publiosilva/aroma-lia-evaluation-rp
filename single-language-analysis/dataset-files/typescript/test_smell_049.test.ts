import { expect } from '@jest/globals';

describe('SkinCleanupTest', () => {
  it.skip("JDK-8277000", () => {
    const tableView = createPersonTreeTable(false);
    showControl(tableView, true);
    const tableRow = getCell(tableView, 1) as TreeTableRow<unknown>;
    const rowSkin = tableRow.getSkin() as TreeTableRowSkin<unknown>;
    expect(unregisterChangeListeners(rowSkin, tableView.fixedCellSizeProperty())).toBeNull();
  });
});