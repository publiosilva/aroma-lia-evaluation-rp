const { expect } = require('jest');

describe('Api', () => {
    it("test_smell_147", async () => {
        const data = { text: "I hate this product!" };

        const response = await fetch(BASE_URL, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data),
        });

        console.log(`Response: ${await response.text()}`);

        expect(response.status).toBe(200);

        const responseJson = await response.json();
        expect(responseJson).toHaveProperty('predicted_label', "Response missing 'predicted_label'");
        expect(responseJson).toHaveProperty('confidence', "Response missing 'confidence'");
    });
});