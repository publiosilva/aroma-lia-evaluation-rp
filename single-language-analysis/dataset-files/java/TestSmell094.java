import org.junit.Test;
import static org.junit.Assert.*;

public class TestSmell094 {

    @Test
    public void testBumpVersion() {
        QipkgAction qipkgAction = new QipkgAction();
        Project dProj = qipkgAction.addTestProject("d_pkg");
        String manifestXml = dProj.getPath() + "/manifest.xml";
        String name = Qipkg.builder.pkgName(manifestXml);
        assertEquals("d-0.1", name);
        qipkgAction.execute("bump-version", manifestXml);
        name = Qipkg.builder.pkgName(manifestXml);
        assertEquals("d-0.2", name);
        qipkgAction.execute("bump-version", manifestXml, "2.0");
        name = Qipkg.builder.pkgName(manifestXml);
        assertEquals("d-2.0", name);
    }
}