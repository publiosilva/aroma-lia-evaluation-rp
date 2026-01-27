const { expect } = require('jest');

describe('ClientPredictions', () => {
    it("test_smell_158", async () => {
        const client = await connect(progressDemo);
        const job = client.submit("test_smell_158", { apiName: "/predict" });
        const statuses = [];
        while (!job.done()) {
            statuses.push(job.status());
            await new Promise(resolve => setTimeout(resolve, 20));
        }
        expect(statuses.some(s => s.code === Status.PROGRESS)).toBe(true);
        expect(statuses.some(s => s.progressData !== null)).toBe(true);
        const allProgressData = [].concat(...statuses
            .filter(s => s.progressData)
            .map(s => s.progressData));
        let count = 0;
        for (let i = 0; i < 20; i++) {
            const unit = new ProgressUnit({
                index: i,
                length: 20,
                unit: "steps",
                progress: null,
                desc: null
            });
            count += allProgressData.includes(unit) ? 1 : 0;
        }
        expect(count).toBeGreaterThan(0);
    });
});