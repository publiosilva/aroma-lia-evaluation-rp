import { expect } from '@jest/globals';

describe('PriorityOrdering', () => {
    it("test_smell_157", async () => {
        // First request with MEDIUM priority
        const response1 = await client.post("/ingest", {
            json: { ids: [1, 2, 3, 4, 5], priority: "MEDIUM" }
        });
        const ingestionId1 = response1.json().ingestion_id;

        // Second request with HIGH priority
        const response2 = await client.post("/ingest", {
            json: { ids: [6, 7, 8, 9], priority: "HIGH" }
        });
        const ingestionId2 = response2.json().ingestion_id;

        // Wait for some processing
        await new Promise(resolve => setTimeout(resolve, 6000));

        // Check status of both requests
        const status1 = await client.get(`/status/${ingestionId1}`);
        const status2 = await client.get(`/status/${ingestionId2}`);

        // HIGH priority request should have more completed batches
        const completedBatches1 = status1.json().batches.reduce((count: number, batch: any) => {
            return count + (batch.status === BatchStatus.COMPLETED ? 1 : 0);
        }, 0);
        const completedBatches2 = status2.json().batches.reduce((count: number, batch: any) => {
            return count + (batch.status === BatchStatus.COMPLETED ? 1 : 0);
        }, 0);

        expect(completedBatches2).toBeGreaterThanOrEqual(completedBatches1);
    });
});