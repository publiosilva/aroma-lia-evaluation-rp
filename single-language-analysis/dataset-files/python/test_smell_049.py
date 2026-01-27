import pytest

class TestSkinCleanup:
    @pytest.mark.skip(reason="JDK-8277000")
    def test_smell_049(self):
        table_view = self.create_person_tree_table(False)
        self.show_control(table_view, True)
        table_row = self.get_cell(table_view, 1)
        row_skin = table_row.get_skin()
        assert row_skin.unregister_change_listeners(table_view.fixed_cell_size_property()) is None