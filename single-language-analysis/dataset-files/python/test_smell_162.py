# Original URL: https://github.com/Phlogistique/qibuild/blob/27876e99deac05f60984468ec4eb48ba693dbc2c/python/qipkg/test/test_qipkg.py#L177-L179

def test_smell_162(qipkg_action):
    pkg_path = os.path.join(os.path.dirname(__file__), "projects", "python_services.pkg")
    qipkg_action("validate_package", pkg_path)