import org.junit.Test;
import static org.junit.Assert.*;
import java.io.File;

public class TestSmell102 {

    @Test
    public void testBreakpadSymbols() {
        String dumpSyms = qisys.command.findProgram("dump_syms", false);
        if (dumpSyms == null) {
            return;
        }

        QipkgAction aCppProj = qipkgAction.addTestProject("a_cpp");
        String pml = aCppProj.path + "/a_cpp.pml";

        qipkgAction("configure", "--release", "--with-debug-info", pml);
        qipkgAction("build", pml);
        Object[] result = qipkgAction("make-package", "--with-breakpad", pml);
        Object pkg = result[0];
        Object symbolsArchive = result[1];
        assertTrue(new File((String) symbolsArchive).exists());
    }
}