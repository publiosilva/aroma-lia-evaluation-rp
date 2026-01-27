import { expect } from '@jest/globals';

describe('Qipkg', () => {
  it("test_smell_094", () => {
    const dProj = qipkgAction.addTestProject("d_pkg");
    const manifestXml = path.join(dProj.path, "manifest.xml");
    let name = qipkg.builder.pkgName(manifestXml);
    expect(name).toBe("d-0.1");
    qipkgAction("bump-version", manifestXml);
    name = qipkg.builder.pkgName(manifestXml);
    expect(name).toBe("d-0.2");
    qipkgAction("bump-version", manifestXml, "2.0");
    name = qipkg.builder.pkgName(manifestXml);
    expect(name).toBe("d-2.0");
  });
});