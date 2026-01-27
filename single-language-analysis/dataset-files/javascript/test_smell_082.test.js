const { expect } = require('jest');

describe('PojoTest', () => {
    it("test_smell_082", () => {
        const packageName = "com.example.myapp"; // Your package name
        const ignoredClasses = new Set();
        ignoredClasses.add(CustomException);  // Example of ignoring a specific exception
        PojoTestUtility.testAllPojosInPackage(packageName, ignoredClasses);
    });
});