using Xunit;

public class TestSmell094
{
    [Fact]
    public void TestBumpVersion()
    {
        var dProj = qipkg_action.AddTestProject("d_pkg");
        var manifestXml = System.IO.Path.Combine(dProj.Path, "manifest.xml");
        var name = qipkg.Builder.PkgName(manifestXml);
        Assert.Equal("d-0.1", name);
        qipkg_action("bump-version", manifestXml);
        name = qipkg.Builder.PkgName(manifestXml);
        Assert.Equal("d-0.2", name);
        qipkg_action("bump-version", manifestXml, "2.0");
        name = qipkg.Builder.PkgName(manifestXml);
        Assert.Equal("d-2.0", name);
    }
}