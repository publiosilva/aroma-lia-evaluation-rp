import { expect } from '@jest/globals';

describe('PluginLoadingAndUsage', () => {
    it("test_smell_139", () => {
        const scheduler = new ThreadSafeScheduler();
        const results: string[] = [];
        
        const plugin = (data: string) => {
            results.push(data);
        };
        
        scheduler.loadPlugin('p1', plugin);
        
        const job = () => scheduler.plugins['p1']('ok');
        scheduler.schedule('jobp', job, { cronExpr: 1 });
        scheduler.scheduleOneOff('onep', job, { runAt: new Date(Date.now() + 1000) });
        
        const time = require('time');
        time.sleep(1.1);
        scheduler._runPending();
        time.sleep(0.1);
        
        expect(results.filter(result => result === 'ok').length).toBe(2);
    });
});