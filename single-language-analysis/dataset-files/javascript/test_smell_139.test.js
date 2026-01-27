const { expect } = require('jest');

describe('PluginLoadingAndUsage', () => {
    it("test_smell_139", async () => {
        const scheduler = new ThreadSafeScheduler();
        const results = [];
        
        function plugin(data) {
            results.push(data);
        }
        
        scheduler.loadPlugin('p1', plugin);
        
        function job() {
            scheduler.plugins['p1']('ok');
        }
        
        scheduler.schedule('jobp', job, { cronExpr: 1 });
        scheduler.scheduleOneOff('onep', job, { runAt: new Date(Date.now() + 1000) });
        
        await new Promise(resolve => setTimeout(resolve, 1100));
        scheduler._runPending();
        await new Promise(resolve => setTimeout(resolve, 100));
        
        expect(results.filter(x => x === 'ok').length).toBe(2);
    });
});