const { expect } = require('jest');

describe('ValidatePackage', () => {
    it("test_smell_162", () => {
        const pkgPath = path.join(__dirname, "projects", "python_services.pkg");
        qipkgAction("validate_package", pkgPath);
    });
});