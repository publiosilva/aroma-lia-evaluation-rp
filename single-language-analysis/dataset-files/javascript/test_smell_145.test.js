const { expect } = require('jest');

describe('ClassName', () => {
    it("test_smell_145", async () => {
        const data = { text: "" };

        const response = await fetch(BASE_URL, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        });

        console.log(`Response: ${await response.text()}`);

        expect(response.status).toBe(400);
        
        const responseJson = await response.json();
        expect(responseJson).toHaveProperty('detail');
        expect(responseJson.detail).toBe("Le texte ne peut pas être vide.");
    });
});