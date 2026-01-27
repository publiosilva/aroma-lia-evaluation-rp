const { expect } = require('jest');

describe('RecurringAndCancelAndReschedule', () => {
    it("test_smell_153", async () => {
        const rv = await client.post('/jobs/recurring', { json: { interval: 0.1, sla_jitter: 0, func: 'y' } });
        const jid = rv.body.job_id;
        await new Promise(resolve => setTimeout(resolve, 300));
        const rv2 = await client.delete(`/jobs/${jid}/cancel`);
        expect(rv2.status).toBe(200);
        const rv3 = await client.post(`/jobs/${jid}/reschedule`, { json: { interval: 0.05 } });
        expect(rv3.status).toBe(200);
        const data = rv3.body;
        expect(data.rescheduled).toBe(jid);
        expect(data.new_interval).toBe(0.05);
    });
});