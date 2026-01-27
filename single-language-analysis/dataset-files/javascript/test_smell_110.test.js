const { expect } = require('jest');

describe('IncorrectFakePoller', () => {
    test("test_smell_110", async () => {
        let poller = new Poller(rpcProxy);
        expect(poller.hasBlocknotify).toBe(false);
        expect(poller.hasWalletnotify).toBe(false);
        expect(poller.hasAlertnotify).toBe(false);

        poller = new Poller(rpcProxy, { cmds: { blocknotify: 'echo "%s"' } });
        expect(poller.hasBlocknotify).toBe(true);
        expect(poller.hasWalletnotify).toBe(false);
        expect(poller.hasAlertnotify).toBe(false);

        poller = new Poller(rpcProxy, { cmds: { walletnotify: 'echo "%s"' } });
        expect(poller.hasBlocknotify).toBe(false);
        expect(poller.hasWalletnotify).toBe(true);
        expect(poller.hasAlertnotify).toBe(false);

        poller = new Poller(rpcProxy, { cmds: { alertnotify: 'echo "%s"' } });
        expect(poller.hasBlocknotify).toBe(false);
        expect(poller.hasWalletnotify).toBe(false);
        expect(poller.hasAlertnotify).toBe(true);

        poller = new Poller(rpcProxy, { cmds: { blocknotify: 'echo "%s"', walletnotify: 'echo "%s"', alertnotify: 'echo "%s"' } });
        expect(poller.hasBlocknotify).toBe(true);
        expect(poller.hasWalletnotify).toBe(true);
        expect(poller.hasAlertnotify).toBe(true);
    });
});