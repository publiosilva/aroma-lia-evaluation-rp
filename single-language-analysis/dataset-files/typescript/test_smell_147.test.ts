import { expect } from '@jest/globals';
import axios from 'axios';

const BASE_URL = 'your_base_url_here'; // Replace with actual base URL

describe('PredictNegativeText', () => {
    it("test_smell_147", async () => {
        const data = { text: 'I hate this product!' };

        const response = await axios.post(BASE_URL, data, { headers });

        console.log(`Response: ${response.data}`);

        expect(response.status).toBe(200);
        const responseJson = response.data;
        expect(responseJson).toHaveProperty('predicted_label', expect.anything());
        expect(responseJson).toHaveProperty('confidence', expect.anything());
    });
});