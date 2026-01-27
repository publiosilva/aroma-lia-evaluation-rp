using Xunit;

public class TestSmell136
{
    [Fact(Skip = "")]
    public void TestTranslations()
    {
        if (!Qisys.Command.FindProgram("lrelease", raises: false))
        {
            return;
        }

        var TrProject = QipkgAction.AddTestProject("tr_project");
        var PmlPath = System.IO.Path.Combine(TrProject.Path, "tr.pml");
        var Package = QipkgAction("make-package", PmlPath);
        var Dest = Tmpdir.Mkdir("dest");
        QipkgAction.Chdir(Dest);
        QipkgAction("extract-package", Package);
        Assert.True(Dest.Join("tr-0.1", "translations", "tr_fr_FR.qm").Check(file: true));
    }
}