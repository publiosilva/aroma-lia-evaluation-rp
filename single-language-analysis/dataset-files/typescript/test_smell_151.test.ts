import { expect } from '@jest/globals';

describe('TestClassname', () => {
    it("test_smell_151", async () => {
        for (let i = 0; i < 10; i++) {
            await client.send(`hello ${i}`);
            const data = await client.receive();
            if (!data) {
                console.log('connection closed');
                break;
            }
            console.log(`received: ${data}`);
            await new Promise(resolve => setTimeout(resolve, 100));
            i += 1;
        }
        expect(true).toBe(true);
        console.log('hello world');
    });
});