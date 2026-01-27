using Xunit;

public class TestSmell082
{
    [Fact]
    public void TestAllPojosInPackage()
    {
        string packageName = "com.example.myapp"; // Your package name
        HashSet<System.Type> ignoredClasses = new HashSet<System.Type>();
        ignoredClasses.Add(typeof(CustomException));  // Example of ignoring a specific exception
        PojoTestUtility.TestAllPojosInPackage(packageName, ignoredClasses);
    }
}