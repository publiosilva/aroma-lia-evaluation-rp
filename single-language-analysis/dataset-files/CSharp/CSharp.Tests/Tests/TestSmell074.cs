using Xunit;

public class TestSmell074
{
    [Fact]
    public void Test8()
    {
        OOoBean bean1 = new OOoBean(new PrivateLocalOfficeConnection(connection.GetComponentContext()));
        BeanPanel bp1 = new BeanPanel(bean1);
        OOoBean bean2 = new OOoBean(new PrivateLocalOfficeConnection(connection.GetComponentContext()));
        BeanPanel bp2 = new BeanPanel(bean2);
        OOoBean bean3 = new OOoBean(new PrivateLocalOfficeConnection(connection.GetComponentContext()));
        BeanPanel bp3 = new BeanPanel(bean3);
        OOoBean bean4 = new OOoBean(new PrivateLocalOfficeConnection(connection.GetComponentContext()));
        BeanPanel bp4 = new BeanPanel(bean4);

        try
        {
            Frame f = new Frame("OOoBean example with several instances");
            f.SetLayout(new GridBagLayout());
            GridBagConstraints c = new GridBagConstraints();
            c.Fill = GridBagConstraints.HORIZONTAL;
            c.Weightx = 0.5;

            c.Insets = new Insets(0, 0, 0, 10);
            c.gridx = 0;
            c.gridy = 0;
            f.Add(bp1, c);

            c.gridx = 1;
            c.Insets = new Insets(0, 0, 0, 0);
            f.Add(bp2, c);

            c.gridx = 0;
            c.gridy = 1;
            c.Insets = new Insets(10, 0, 0, 10);
            f.Add(bp3, c);

            c.gridx = 1;
            c.gridy = 1;
            c.Insets = new Insets(10, 0, 0, 0);
            f.Add(bp4, c);

            f.Pack();
            f.SetBounds(0, 0, 1000, 600);
            f.SetVisible(true);
            try
            {
                bean1.LoadFromURL("private:factory/swriter", null);
                bean2.LoadFromURL("private:factory/swriter", null);
                bean3.LoadFromURL("private:factory/swriter", null);
                bean4.LoadFromURL("private:factory/swriter", null);
            }
            catch (Exception e)
            {
                System.Console.WriteLine(e.StackTrace);
            }
            f.Validate();

            Thread.Sleep(10000);
        }
        finally
        {
            bean1.StopOOoConnection();
            bean2.StopOOoConnection();
            bean3.StopOOoConnection();
            bean4.StopOOoConnection();
        }
    }
}