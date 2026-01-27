const { expect } = require('jest');

describe('Dates', () => {
  it.skip("test_smell_098", () => {
    const args = comm.getAnonArgs(args);
    if (args.length === 0) {
      throw new cex.ArgError("At least one argument is required.  Usage:\n" +
        "splunk test dates \"<string>\" OR\n" +
        "splunk test dates file <filename>");
    }

    const argString = args.map(x => `"${x}"`).join(" ");
    os.system("parsetest " + argString);
  });
});