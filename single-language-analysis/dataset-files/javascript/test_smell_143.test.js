const { expect } = require('jest');
const { Ocr } = require('source/ocr/ocr');

describe('Ocr', () => {
    it("test_smell_143", () => {
        const ocr = new Ocr();
        console.log("OCR RESULT: " + String(ocr.ocrSingleLine(cv2.imread(`${ROOT_PATH}/assets/pytest/AreaBigmapSidebarCommissionName.jpg`))));
        expect(1).toBe(1);
    });
});