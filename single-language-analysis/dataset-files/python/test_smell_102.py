# Original URL: https://github.com/Phlogistique/qibuild/blob/27876e99deac05f60984468ec4eb48ba693dbc2c/python/qipkg/test/test_qipkg.py#L71-L82

def test_smell_102(qipkg_action):
    dump_syms = qisys.command.find_program("dump_syms", raises=False)
    if not dump_syms:
        return

    a_cpp_proj = qipkg_action.add_test_project("a_cpp")
    pml = os.path.join(a_cpp_proj.path, "a_cpp.pml")

    qipkg_action("configure", "--release", "--with-debug-info", pml)
    qipkg_action("build", pml)
    pkg, symbols_archive = qipkg_action("make-package", "--with-breakpad", pml)
    assert os.path.exists(symbols_archive)