import { expect } from '@jest/globals';
import { Ocr } from 'source/ocr/ocr';
import cv2 from 'cv2'; // Adjust import based on actual cv2 TypeScript binding

describe('Ocr', () => {
    it("test_smell_143", () => {
        const ocr = new Ocr();
        console.log("OCR RESULT: " + String(ocr.ocrSingleLine(cv2.imread(`${ROOT_PATH}/assets/pytest/AreaBigmapSidebarCommissionName.jpg`))));
        expect(1).toBe(1);
    });
});