# Original URL: https://github.com/Phlogistique/qibuild/blob/27876e99deac05f60984468ec4eb48ba693dbc2c/python/qipkg/test/test_qipkg.py#L166-L175

@pytest.mark.skipif(not qisys.command.find_program("lrelease", raises=False),
                    reason="lrelease not found")
def test_smell_136(qipkg_action, tmpdir):
    tr_project = qipkg_action.add_test_project("tr_project")
    pml_path = os.path.join(tr_project.path, "tr.pml")
    package = qipkg_action("make-package", pml_path)
    dest = tmpdir.mkdir("dest")
    qipkg_action.chdir(dest)
    qipkg_action("extract-package", package)
    assert dest.join("tr-0.1", "translations", "tr_fr_FR.qm").check(file=True)