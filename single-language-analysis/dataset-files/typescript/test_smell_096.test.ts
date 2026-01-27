import { expect } from '@jest/globals';

describe('CreateUserAndServer', () => {
    it("test_smell_096", async () => {
        await waitForHub(apiRequest);

        const username: string = String(uuid4());
        await apiRequest("post", "/hub/api/users", { json: { usernames: [username] } });

        await apiRequest("post", `/hub/api/users/${username}/server`);

        let ready: boolean = false;
        const now: number = Date.now();
        while (!ready) {
            const waitR = await apiRequest("get", `/hub/api/users/${username}`);
            if (waitR.json().servers[""]["ready"]) {
                ready = true;
                break;
            }
            if (Date.now() - now > TIMEOUT) {
                throw new Error(`Singleuser server did not start in ${TIMEOUT} seconds`);
            }
            await new Promise(resolve => setTimeout(resolve, 5000));
        }

        const serverR = await apiRequest("get", `/user/${username}/api`);
        expect(serverR.json()).toHaveProperty("version");
        const contentsR = await apiRequest("get", `/user/${username}/api/contents`);
        expect(contentsR.json()).toHaveProperty("content");
    });
});