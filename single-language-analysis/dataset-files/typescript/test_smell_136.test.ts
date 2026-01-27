import { expect } from '@jest/globals';

describe('Translations', () => {
  it.skip('should test translations', () => {
    const trProject = qipkgAction.addTestProject("tr_project");
    const pmlPath = `${trProject.path}/tr.pml`;
    const package = qipkgAction("make-package", pmlPath);
    const dest = tmpdir.mkdir("dest");
    qipkgAction.chdir(dest);
    qipkgAction("extract-package", package);
    expect(dest.join("tr-0.1", "translations", "tr_fr_FR.qm").check({ file: true })).toBe(true); // Test implementation needed
  });
});