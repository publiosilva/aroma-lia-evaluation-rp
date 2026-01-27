import { expect } from '@jest/globals';

describe('OOoBeanTest', () => {
    it("test_smell_074", async () => {
        const bean1 = new OOoBean(new PrivateLocalOfficeConnection(connection.getComponentContext()));
        const bp1 = new BeanPanel(bean1);
        const bean2 = new OOoBean(new PrivateLocalOfficeConnection(connection.getComponentContext()));
        const bp2 = new BeanPanel(bean2);
        const bean3 = new OOoBean(new PrivateLocalOfficeConnection(connection.getComponentContext()));
        const bp3 = new BeanPanel(bean3);
        const bean4 = new OOoBean(new PrivateLocalOfficeConnection(connection.getComponentContext()));
        const bp4 = new BeanPanel(bean4);

        try {
            const f = new Frame("OOoBean example with several instances");
            f.setLayout(new GridBagLayout());
            const c = new GridBagConstraints();
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
                await bean1.loadFromURL("private:factory/swriter", null);
                await bean2.loadFromURL("private:factory/swriter", null);
                await bean3.loadFromURL("private:factory/swriter", null);
                await bean4.loadFromURL("private:factory/swriter", null);
            } catch (e) {
                console.error(e);
            }
            f.validate();

            await new Promise(resolve => setTimeout(resolve, 10000));
        } finally {
            bean1.stopOOoConnection();
            bean2.stopOOoConnection();
            bean3.stopOOoConnection();
            bean4.stopOOoConnection();
        }
    });
});