// Original URL: https://github.com/AJohnstone2007/referenceLanguageCorpora/blob/2e8331957fa4c61d7979be7b54792a23fc8be724/languages/java/corpus/javaFX/cws/SkinCleanupTest.java#L68-L77

public class TestSmell049 {
@Ignore("JDK-8277000")
@Test
public void testTreeTableRowFixedCellSizeListener() {
TreeTableView<Person> tableView = createPersonTreeTable(false);
showControl(tableView, true);
TreeTableRow<?> tableRow = (TreeTableRow<?>) getCell(tableView, 1);
TreeTableRowSkin<?> rowSkin = (TreeTableRowSkin<?>) tableRow.getSkin();
assertNull("row skin must not have listener to fixedCellSize",
unregisterChangeListeners(rowSkin, tableView.fixedCellSizeProperty()));
}
}
