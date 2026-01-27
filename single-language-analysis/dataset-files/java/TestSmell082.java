// Original URL: https://github.com/Rajinfo/spectre/blob/2884495380c90037c5b4450a8fce0cdb4bf84cc8/PojoTest.java#L8-L14

public class TestSmell082 {
    @Test
    public void testAllPojosInPackage() {
        String packageName = "com.example.myapp"; // Your package name
        Set<Class<?>> ignoredClasses = new HashSet<>();
        ignoredClasses.add(CustomException.class);  // Example of ignoring a specific exception
        PojoTestUtility.testAllPojosInPackage(packageName, ignoredClasses);
    }
}
