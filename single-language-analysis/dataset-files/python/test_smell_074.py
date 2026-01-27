import pytest

class TestOoBeanTest:
    def test_smell_074(self):
        bean1 = OOoBean(PrivateLocalOfficeConnection(connection.get_component_context()))
        bp1 = BeanPanel(bean1)
        bean2 = OOoBean(PrivateLocalOfficeConnection(connection.get_component_context()))
        bp2 = BeanPanel(bean2)
        bean3 = OOoBean(PrivateLocalOfficeConnection(connection.get_component_context()))
        bp3 = BeanPanel(bean3)
        bean4 = OOoBean(PrivateLocalOfficeConnection(connection.get_component_context()))
        bp4 = BeanPanel(bean4)

        try:
            f = Frame("OOoBean example with several instances")
            f.set_layout(GridBagLayout())
            c = GridBagConstraints()
            c.fill = GridBagConstraints.HORIZONTAL
            c.weightx = 0.5

            c.insets = Insets(0, 0, 0, 10)
            c.gridx = 0
            c.gridy = 0
            f.add(bp1, c)

            c.gridx = 1
            c.insets = Insets(0, 0, 0, 0)
            f.add(bp2, c)

            c.gridx = 0
            c.gridy = 1
            c.insets = Insets(10, 0, 0, 10)
            f.add(bp3, c)

            c.gridx = 1
            c.gridy = 1
            c.insets = Insets(10, 0, 0, 0)
            f.add(bp4, c)

            f.pack()
            f.set_bounds(0, 0, 1000, 600)
            f.set_visible(True)
            try:
                bean1.load_from_url("private:factory/swriter", None)
                bean2.load_from_url("private:factory/swriter", None)
                bean3.load_from_url("private:factory/swriter", None)
                bean4.load_from_url("private:factory/swriter", None)
            except Exception as e:
                print(e)
            f.validate()

            time.sleep(10)
        finally:
            bean1.stop_o_o_connection()
            bean2.stop_o_o_connection()
            bean3.stop_o_o_connection()
            bean4.stop_o_o_connection()