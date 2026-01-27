# Original URL: https://github.com/Sudistark/splunk-python/blob/e2c3e0a69ef29c4c8a6c4dcd59dd3c47ff620bd1/clilib/test_clilib.py#L35-L40

@pytest_mark_skip_conditional(reason="SPL-175665: Probably a regression or functional test now")
def testSourcetypes(args, fromCLI):
  paramsReq = (ARG_FILE,)
  paramsOpt = ()
  comm.validateArgs(paramsReq, paramsOpt, args)
  os.system("classify \"%s\"" % args[ARG_FILE])