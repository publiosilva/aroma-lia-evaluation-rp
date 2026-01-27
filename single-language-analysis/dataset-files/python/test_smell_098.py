# Original URL: https://github.com/Sudistark/splunk-python/blob/e2c3e0a69ef29c4c8a6c4dcd59dd3c47ff620bd1/clilib/test_clilib.py#L16-L26

@pytest_mark_skip_conditional(reason="SPL-175665: Probably a regression or functional test now")
def testDates(args, fromCLI):
  args = comm.getAnonArgs(args)
  if 0 == len(args):
    raise cex.ArgError("At least one argument is required.  Usage:\n"
        + "splunk test dates \"<string>\" OR\n"
        + "splunk test dates file <filename>")

  # build a string that will end up like: parsetest "foo" "bar baz".  quotes are fun.
  argString = str.join(str(" "), [("\"%s\"" % x) for x in args])
  os.system("parsetest " + argString)