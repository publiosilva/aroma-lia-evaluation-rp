using Xunit;

public class TestSmell049
{
    [Fact(Skip = "")]
    public void TestTreeTableRowFixedCellSizeListener()
    {
        TreeTableView<Person> tableView = CreatePersonTreeTable(false);
        ShowControl(tableView, true);
        TreeTableRow<object> tableRow = (TreeTableRow<object>)GetCell(tableView, 1);
        TreeTableRowSkin<object> rowSkin = (TreeTableRowSkin<object>)tableRow.GetSkin();
        Assert.Null(UnregisterChangeListeners(rowSkin, tableView.FixedCellSizeProperty()), "row skin must not have listener to fixedCellSize");
    }
}