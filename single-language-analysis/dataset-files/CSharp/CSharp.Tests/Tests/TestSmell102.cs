using Xunit;
using System.IO;

public class TestSmell102
{
    [Fact]
    public void TestBreakpadSymbols()
    {
        var dumpSyms = Qisys.Command.FindProgram("dump_syms", raises: false);
        if (dumpSyms == null)
        {
            return;
        }

        var aCppProj = QipkgAction.AddTestProject("a_cpp");
        var pml = Path.Combine(aCppProj.Path, "a_cpp.pml");

        QipkgAction("configure", "--release", "--with-debug-info", pml);
        QipkgAction("build", pml);
        var (pkg, symbolsArchive) = QipkgAction("make-package", "--with-breakpad", pml);
        Assert.True(File.Exists(symbolsArchive));
    }
}