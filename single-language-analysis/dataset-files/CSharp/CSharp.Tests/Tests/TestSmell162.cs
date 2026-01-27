using Xunit;
using System.IO;

public class TestSmell162
{
    [Fact]
    public void TestValidatePackage()
    {
        string pkgPath = Path.Combine(Path.GetDirectoryName(__file__), "projects", "python_services.pkg");
        qipkg_action("validate_package", pkgPath);
    }
}