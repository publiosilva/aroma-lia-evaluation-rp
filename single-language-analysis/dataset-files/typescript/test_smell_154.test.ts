import { expect } from '@jest/globals';

describe('ImpalaShellInteractive', () => {
  it("test_smell_154", async () => {
    const impalad = new ImpaladService(socket.getfqdn());
    await impalad.waitForNumInFlightQueries(0);
    const command = "select sleep(10000);";
    const p = _startNewShellProcess();
    _sendCmdToShell(p, command);
    await new Promise(resolve => setTimeout(resolve, 1000));
    const shellPid = cancellationHelper();
    await new Promise(resolve => setTimeout(resolve, 2000));
    os.kill(shellPid, signal.SIGINT);
    const result = getShellCmdResult(p);
    expect(await impalad.waitForNumInFlightQueries(0)).toBe(true); // Assuming this returns a boolean
  });
});