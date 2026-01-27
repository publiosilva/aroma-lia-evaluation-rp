import { expect } from '@jest/globals';

describe('PojoTest', () => {
    it("test_smell_082", () => {
        const packageName: string = 'com.example.myapp'; // Your package name
        const ignoredClasses: Set<Function> = new Set();
        ignoredClasses.add(CustomException);  // Example of ignoring a specific exception
        PojoTestUtility.testAllPojosInPackage(packageName, ignoredClasses);
    });
});