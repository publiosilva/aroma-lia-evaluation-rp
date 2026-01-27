import org.junit.Test;
import static org.junit.Assert.*;

public class TestSmell136 {

    @Test
    @DisabledIf("lreleaseNotFound")
    public void testTranslations() {
        TestProject trProject = qipkgAction.addTestProject("tr_project");
        String pmlPath = trProject.getPath() + "/tr.pml";
        Package pkg = qipkgAction("make-package", pmlPath);
        Directory dest = tmpdir.mkdir("dest");
        qipkgAction.chdir(dest);
        qipkgAction("extract-package", pkg);
        assertTrue(dest.join("tr-0.1", "translations", "tr_fr_FR.qm").checkFile());
    }
}