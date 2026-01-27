import { expect } from '@jest/globals';
import axios from 'axios';

const BASE_URL = 'your_base_url_here'; // Replace with actual base URL

describe('Predict', () => {
    it("test_smell_145", async () => {
        const data = { text: "" };
        const headers = {}; // Define headers as needed

        const response = await axios.post(BASE_URL, data, { headers });

        console.log(`Response: ${response.data}`);

        expect(response.status).toBe(400);
        
        const responseJson = response.data;
        expect(responseJson).toHaveProperty('detail');
        expect(responseJson.detail).toBe("Le texte ne peut pas être vide.");
    });
});