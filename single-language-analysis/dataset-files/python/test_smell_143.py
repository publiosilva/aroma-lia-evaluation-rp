# Original URL: https://github.com/infstellar/genshin_impact_assistant/blob/9d3357bbe6c50b5aff410d5695da4bd52e0dc26e/source/ocr/test_ocr.py#L6-L10

def test_smell_143():
    from source.ocr.ocr import Ocr
    ocr = Ocr()
    logger.info("OCR RESULT: "+str(ocr.ocr_single_line(cv2.imread(fr'{ROOT_PATH}/assets/pytest/AreaBigmapSidebarCommissionName.jpg'))))
    assert 1