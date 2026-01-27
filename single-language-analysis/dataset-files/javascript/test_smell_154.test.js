const { expect } = require('jest');

describe('ImpalaShellInteractive', () => {
  it("test_smell_154", async () => {
    const impalad = new ImpaladService(socket.getfqdn());
    impalad.waitForNumInFlightQueries(0);
    const command = "select sleep(10000);";
    const p = this._startNewShellProcess();
    this._sendCmdToShell(p, command);
    await new Promise(resolve => setTimeout(resolve, 1));
    
    const shellPid = cancellationHelper();
    await new Promise(resolve => setTimeout(resolve, 2));
    os.kill(shellPid, signal.SIGINT);
    const result = getShellCmdResult(p);
    expect(impalad.waitForNumInFlightQueries(0)).toBe();
  });
});