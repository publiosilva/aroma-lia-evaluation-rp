# Original URL: https://github.com/Phlogistique/qibuild/blob/27876e99deac05f60984468ec4eb48ba693dbc2c/python/qipkg/test/test_qipkg.py#L221-L231

def test_smell_094(qipkg_action):
    d_proj = qipkg_action.add_test_project("d_pkg")
    manifest_xml = os.path.join(d_proj.path, "manifest.xml")
    name = qipkg.builder.pkg_name(manifest_xml)
    assert name == "d-0.1"
    qipkg_action("bump-version", manifest_xml)
    name = qipkg.builder.pkg_name(manifest_xml)
    assert name == "d-0.2"
    qipkg_action("bump-version", manifest_xml, "2.0")
    name = qipkg.builder.pkg_name(manifest_xml)
    assert name == "d-2.0"