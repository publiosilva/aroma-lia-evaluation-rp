// Original URL: https://github.com/alibaba/alios-libreoffice/blob/e9a6cc08a12b5133a9dccf337d16f9a534f57f1e/bean/qa/complex/bean/OOoBeanTest.java#L586-L649

public class TestSmell074 {
    /** Using multiple instances of OOoBean at the same time
     */
    @Test public void test8() throws Exception
    {
        OOoBean bean1 = new OOoBean(new PrivateLocalOfficeConnection(connection.getComponentContext()));
        BeanPanel bp1 = new BeanPanel(bean1);
        OOoBean bean2 = new OOoBean(new PrivateLocalOfficeConnection(connection.getComponentContext()));
        BeanPanel bp2 = new BeanPanel(bean2);
        OOoBean bean3 = new OOoBean(new PrivateLocalOfficeConnection(connection.getComponentContext()));
        BeanPanel bp3 = new BeanPanel(bean3);
        OOoBean bean4 = new OOoBean(new PrivateLocalOfficeConnection(connection.getComponentContext()));
        BeanPanel bp4 = new BeanPanel(bean4);

        try
        {
            Frame f = new Frame("OOoBean example with several instances");
            f.setLayout(new GridBagLayout());
            GridBagConstraints c = new GridBagConstraints();
            c.fill = GridBagConstraints.HORIZONTAL;
            c.weightx = 0.5;

            c.insets = new Insets(0, 0, 0, 10);
            c.gridx = 0;
            c.gridy = 0;
            f.add(bp1, c);

            c.gridx = 1;
            c.insets = new Insets(0, 0, 0, 0);
            f.add(bp2, c);

            c.gridx = 0;
            c.gridy = 1;
            c.insets = new Insets(10, 0, 0, 10);
            f.add(bp3, c);

            c.gridx = 1;
            c.gridy = 1;
            c.insets = new Insets(10, 0, 0, 0);
            f.add(bp4, c);

            f.pack();
            f.setBounds(0, 0, 1000, 600);
            f.setVisible(true);
            try {
            bean1.loadFromURL("private:factory/swriter", null);
            bean2.loadFromURL("private:factory/swriter", null);
            bean3.loadFromURL("private:factory/swriter", null);
            bean4.loadFromURL("private:factory/swriter", null);
            } catch( Exception e)
            {
                e.printStackTrace();
            }
            f.validate();

            Thread.sleep(10000);
        }
        finally
        {
            bean1.stopOOoConnection();
            bean2.stopOOoConnection();
            bean3.stopOOoConnection();
            bean4.stopOOoConnection();
        }
    }
}
